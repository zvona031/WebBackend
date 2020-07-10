'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthenticationController {
    async register({request, response}){
        const {first_name, last_name, email, password} = request.only([
            'first_name',
            'last_name',
            'email',
            'password'
        ])

        await User.create({
            first_name,
            last_name,
            email,
            password
        })

        return response.send({
            success: 'true',
            message: 'User has been created.'})
    }

    async login({request, response, auth}) {
        const {email,password} = request.only(['email','password'])

        const token = await auth.attempt(email, password)

        return response.json(token)
    }

    async getUser({response, auth}) {
        try {
            await auth.check()
            } catch (error) {
            response.send('Missing or invalid jwt token')
        }
        
            const user = await auth.getUser()
            return response.json({
                status: 'success',
                user: user
              })
          
    }

    async changePassword({request, response}) {

        const user = await User.find(request.input('id'))

        // verify if current password matches
        const verifyPassword = await Hash.verify(
        request.input('password'),
        user.password
        )

        // display appropriate message
        if (!verifyPassword) {
            return response.status(400).json({
                status: 'error',
               message: 'Current password could not be verified! Please try again.'
            })
        }

        // hash and save new password
        console.log(request.input('newPassword'))
        user.password = request.input('newPassword')
        await user.save()

        return response.status(200).json({
            success: 'true',
            message: 'Password updated!'
        })
    }

    
}


module.exports = AuthenticationController
