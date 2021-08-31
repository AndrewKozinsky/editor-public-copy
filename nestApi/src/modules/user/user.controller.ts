import {
    Req, Res, Get, Post, Patch,
    Param, Body, Controller, HttpStatus, UseGuards, UsePipes, Delete
} from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { LoginDto } from './dto/login.dto'
import { SendConfirmLetterDto } from './dto/sendConfirmLetter.dto'
import { ResetPasswordDto } from './dto/resetPassword.dto'
import { ChangeResetPasswordDto } from './dto/changeResetPassword.dto'
import { ChangeEmailDto } from './dto/changeEmail.dto'
import { AuthGuard } from './guards/auth.guard'
import { UserEntity } from './user.entity'
import { User } from './decorators/user.decorator'
import { ChangePasswordDto } from './dto/changePassword.dto'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('getTokenData')
    @UsePipes(new BackendValidationPipe())
    async getTokenData(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const user = await this.userService.getTokenData(req)
        this.userService.buildUserResponse(user, response)
    }

    @Post('signup')
    @UsePipes(new BackendValidationPipe())
    async createUser(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() createUserDto: CreateUserDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.createUser(createUserDto, language)
        this.userService.buildUserResponse(user, response, HttpStatus.CREATED)
    }

    @Post('login')
    @UsePipes(new BackendValidationPipe())
    async login(
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: LoginDto
    ): Promise<void> {
        const user = await this.userService.login(loginDto)
        this.userService.buildUserResponse(user, response, HttpStatus.OK, 'set'  )
    }

    @Post('sendConfirmLetter')
    @UsePipes(new BackendValidationPipe())
    async sendConfirmLetter(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() sendConfirmLetterDto: SendConfirmLetterDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.sendConfirmLetter(sendConfirmLetterDto, language)
        this.userService.buildUserResponse(user, response)
    }

    @Get('confirmEmail/:token')
    @UsePipes(new BackendValidationPipe())
    async confirmEmail(
        @Param('token') token: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const user = await this.userService.confirmEmail(token)
        this.userService.buildUserResponse(user, response, HttpStatus.OK, 'set')
    }

    @Post('resetPassword')
    @UsePipes(new BackendValidationPipe())
    async resetPassword(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.resetPassword(resetPasswordDto, language)
        this.userService.buildUserResponse(user, response)
    }

    @Patch('resetPassword/:token')
    @UsePipes(new BackendValidationPipe())
    async changeResetPassword(
        @Param('token') token: string,
        @Res({ passthrough: true }) response: Response,
        @Body() changeResetPasswordDto: ChangeResetPasswordDto
    ): Promise<void> {
        const user = await this.userService.changeResetPassword(changeResetPasswordDto, token)
        this.userService.buildUserResponse(user, response, HttpStatus.OK, 'set')
    }

    @Patch('changeEmail')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeEmail(
        @Req() req: ExpressRequestInterface,
        @User() user: UserEntity,
        @Res({ passthrough: true }) response: Response,
        @Body() changeEmailDto: ChangeEmailDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const updatedUser = await this.userService.changeEmail(user, changeEmailDto, language)
        this.userService.buildUserResponse(updatedUser, response, undefined, 'clear')
    }

    @Patch('changePassword')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changePassword(
        @User() user: UserEntity,
        @Res({ passthrough: true }) response: Response,
        @Body() changePasswordDto: ChangePasswordDto
    ): Promise<void> {
        const updatedUser = await this.userService.changePassword(user, changePasswordDto)
        this.userService.buildUserResponse(updatedUser, response, undefined, 'set')
    }

    @Delete('me')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async deleteCurrentUser(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const updatedUser = await this.userService.deleteCurrentUser(req)
        this.userService.buildUserResponse(updatedUser, response, undefined, 'clear')
    }
}

