import Category from './tableSchemas/categorySchema';
import Payment from './tableSchemas/paymentSchema';
import Classification from './tableSchemas/classificationSchema';
import Evaluation from './tableSchemas/evaluationSchema';
import Movie from './tableSchemas/movieSchema';
import Signature from './tableSchemas/signatureSchema'
import User from './tableSchemas/userSchema'
import MailConfimation from './tableSchemas/mailConfimationSchema'
import { sequelize } from '../config/configSequelize';
import MovieRequest from './tableSchemas/movieRequestSchema';
import Contact from './tableSchemas/contactSchema';



User.hasOne(Signature, { foreignKey: 'userId', as: 'signature' });
Signature.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(MovieRequest, { foreignKey: 'creatorId', as: 'requests' });
MovieRequest.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

User.hasMany(Movie, { foreignKey: 'creatorId', as: 'createdMovies' });
Movie.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

User.hasMany(Evaluation, { foreignKey: 'userId', as: 'evaluations' });
Evaluation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(MailConfimation, { foreignKey: 'userId', as: 'mailConfirmation' });
MailConfimation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Movie, { foreignKey: 'categoryId', as: 'movies' });
Movie.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Classification.hasMany(Movie, { foreignKey: 'categoryId', as: 'movies' });
Movie.belongsTo(Classification, { foreignKey: 'classificationId', as: 'classification' });

Movie.hasMany(Evaluation, { foreignKey: 'movieId', as: 'evaluations' });
Evaluation.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' });

const init = () => {
  console.log('Erasing database ...');
  sequelize.drop().then(() => {
    console.log('Creating User table ...');
    User.sync({ force: true }).then(() => {
      console.log('Creating Category table ...');
      Category.sync({ force: true }).then(() => {
        console.log('Creating Classification table ...');
        Classification.sync({ force: true }).then(() => {
          console.log('Creating Movie table ...');
          Movie.sync({ force: true }).then(() => {
            console.log('Creating Evaluation table ...');
            Evaluation.sync({ force: true }).then(() => {
              console.log('Creating Signature table ...');
              Signature.sync({ force: true }).then(() => {
                console.log('Creating Mail Confirmation table ...');
                MailConfimation.sync({ force: true }).then(() => {
                  console.log('Creating Payment table ...');
                  Payment.sync({ force: true }).then(() => {
                    console.log('Creating Contact table ...');
                    Contact.sync({ force: true }).then(() => {
                      console.log('Creating MovieRequest table ...');
                      MovieRequest.sync({ force: true }).then(() => {
                        console.log('Database Started ...');
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

const configModels = {

  START:() => { }//init// ,

}

export { configModels }
