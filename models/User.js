const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'You need to provide a username!',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'You need to provide an email',
            trim: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
            unique: true
        },
        //referred to Thought
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        //referred to User
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//create the User model using the UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;
