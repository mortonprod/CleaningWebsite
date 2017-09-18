/// <reference path="../../typingsMine/index.d.ts" />
// A singleton pattern which will store the redux state.
// The state is composed of many user states + component states.
// Initialise user model which can be created multiple times 
// Create single component state.
//When we import this function we do not create a new model. Only run mongoose again but this is needed.
import * as mongoose from 'mongoose';///Can't just get typings. Connected at start.
import * as bcrypt from 'bcrypt'
import { config } from "../config"; 
let dbStore = (function () {
    interface ICompSchema extends IComp, mongoose.SchemaDefinition {
    }
    interface ICompModel extends IComp, mongoose.Document {
    }
    interface IGlobalSchema extends IGlobal, mongoose.SchemaDefinition {
    }
    interface IGlobalModel extends IGlobal, mongoose.Document { }
    let dbStoreInstance: { modelComp: mongoose.Model<ICompModel>; modelGlobal: mongoose.Model<IGlobalModel> };

    /**
     * What the single instance will do
     */
    function create() {
        let Schema = mongoose.Schema;
        let componentsI: ICompSchema;
        let userI: IGlobalSchema; 
        let componentsSchema = new Schema(componentsI);//Create schema for full component state
        let userSchema = new Schema(userI);//Create schema for user
        userSchema.pre("save", (next) => {
            let user = this;
            if (!user.isModified('password')) return next();
            bcrypt.genSalt(config.saltFactor, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                    next();
                });
            });
        });
        userSchema.methods.comparePassword = function (candidatePassword, cb) {//This is function added to model prototype.
            bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        };
        ///Create model to add to database.
        let modelComp = mongoose.model<ICompModel>('modelComp', componentsSchema);//Add components to model
        let modelGlobal = mongoose.model<IGlobalModel>('modelGlobal', userSchema);//Add components to model
        return {
            modelGlobal,
            modelComp
        };
    }

    return {
        getInstance: function () {
            if (!dbStoreInstance) {
                dbStoreInstance = create();
            }
            return dbStoreInstance;
        }
    };
})();

export { dbStore }