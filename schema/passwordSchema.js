const yup = require('yup')

const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string()
        .required('Password must be longer than 3 chars')
        .min(3, 'Password must be longer than 3 chars')
})

module.exports = schema;
