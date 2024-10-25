export default function emailTemplate (prop = {name: 'john smith', email: 'xyz@gmail.com', message: "Barking dog seldom bite."}) {
    const {name, email, message} = prop
    return (`
        <h1>${name}</h1>
        <h1>${email}</h1>
        <h1>${message}</h1>
        `)
}