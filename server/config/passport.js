//Import the local strategy for user auth
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user model
const User = mongoose.model('User');

//Define the strategy
module.exports = function(passport){
    //Primo campo non `e necessario se uso direttamente username come Identificativo,
    //Secondo parametro passo i dati usati per l' auth
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        //Match user
        User.findOne({
            email:email
        }).then(user => {
            if(!user) {
                //By convention, NodeJS uses error-first callbacks which means the first argument to callback functions is always the error object. If you don't have any errors, you pass in null. In other words, if the error argument is null, then the operation was successful and if the error argument is not null, then an error has occurred. 
                return done(null, false, {message: 'No user found'});
            } 
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    //If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
                    return done(null, user);
                } else {
                    //If the credentials are not valid (for example, if the password is incorrect), done should be invoked with false instead of a user to indicate an authentication failure.
                    return done(null, false, {message: 'Password incorrect'});
                }
            });
        })
    }));

    //Utilizzati per mantenere in sessione l' accesso dell'utente
    /*
        TODO: In questo caso mi salvo solo l'id dell'utente
    */
    passport.serializeUser(function(user, done) {
        console.log('Mi salvo l\'utente con id:');
        console.log(user.id);
        done(null, user.id);
    });
     /*
        When a user makes a request for a secured URL. We tell passport how to retrieve the user object from our array of users. It will use the id we stored using the serializeUser method to achieve this.
     */
    passport.deserializeUser(function(id, done) {
        console.log('Ricerco id:');
        console.log(id);
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}
