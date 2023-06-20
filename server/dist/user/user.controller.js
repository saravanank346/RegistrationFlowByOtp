"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const nodemailer = require("nodemailer");
const bcrypt_1 = require("bcrypt");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto, req, res) {
        try {
            const getAllbyMail = await this.userService.getAllByEmail(createUserDto.email);
            if (getAllbyMail) {
                if (getAllbyMail.isverified == true) {
                    console.log("User Already Verified...");
                }
                else {
                    const Generate_otp = (Math.floor(100000 + Math.random() * 90000));
                    console.log(Generate_otp);
                    await this.sendMail(Generate_otp);
                    res.status(common_1.HttpStatus.OK).json({
                        "message": "verification code sent mail...."
                    });
                }
            }
            else {
                const hash_password = await (0, bcrypt_1.hash)(createUserDto.password, 10);
                console.log(hash_password);
                const generate_otp = (Math.floor(100000 + Math.random() * 90000));
                console.log(generate_otp);
                createUserDto.password = hash_password;
                createUserDto.otp = generate_otp;
                await this.userService.create(createUserDto);
                this.sendMail(generate_otp);
                res.json({
                    "message": "verification code sent mail...."
                });
            }
        }
        catch (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: error.message || "Something Went Wrong in}..." });
        }
    }
    async update(body, res, req) {
        try {
            console.log("body", body);
            const body_otp = body.verify_code;
            const getAllByMail = await this.userService.getAllByEmail(body.email);
            console.log(getAllByMail);
            console.log("bodyotp", body.verify_code);
            console.log("getbymailotp", getAllByMail.otp);
            if ((getAllByMail.otp) == parseInt(body_otp)) {
                console.log("inside", body_otp);
                await this.userService.update(getAllByMail.id, { isverified: true });
                return res.status(common_1.HttpStatus.OK).json({
                    message: "Account Verified Successfully"
                });
            }
            else {
                res.json({
                    message: "Invalid OTP..."
                });
            }
        }
        catch (error) {
            res.json({
                message: "account not verified...."
            });
        }
    }
    async login(body, res, req) {
        const { email, password } = body;
        console.log("body", body);
        try {
            const user = await this.userService.getAllByEmail(email);
            console.log("results", user);
            if (user && user.isverified == true) {
                console.log("inside login");
                if (user.loginAttempts < 3) {
                    console.log("inside attempt");
                    const compared = (0, bcrypt_1.compareSync)(password, user.password);
                    console.log(compared);
                    if (compared) {
                        console.log("inside compared");
                        this.userService.updateAttempt(user.id, 0);
                        console.log(user.password);
                        res.status(common_1.HttpStatus.OK).json({
                            message: "login successfull",
                            data: user
                        });
                    }
                    else {
                        const date_now = new Date();
                        console.log("date", date_now);
                        console.log("ids", user.id);
                        console.log("loginAttempt", user.loginAttempts);
                        const AttemptCount = user.loginAttempts;
                        await this.userService.updateLoginAttempt(user.id, AttemptCount + 1, date_now);
                        return res.json({
                            message: "Invalid Password..."
                        });
                    }
                }
                else {
                    const date_now = Date.now();
                    console.log("date", date_now);
                    const time = 1 * 20 * 1000;
                    console.log("time", time);
                    if (date_now - time > user.blockTime) {
                        await this.userService.updateAttempt(user.id, 0);
                    }
                    else {
                        res.status(common_1.HttpStatus.BAD_REQUEST).json({
                            message: "Your Account is Locked ,Please wait for 1 minutes..."
                        });
                    }
                }
            }
            else {
                res.json({
                    message: "You Didnot have Account Please Signup..."
                });
            }
        }
        catch (error) {
            res.json({
                message: error.message || "Something Went Wrong..."
            });
        }
    }
    async send_Otp(body, req, res) {
        try {
            const email = body.email;
            console.log(email);
            const getAllByMail = await this.userService.getAllByEmail(email);
            console.log(getAllByMail);
            const generate_otp = (Math.floor(100000 + Math.random() * 90000));
            console.log(generate_otp);
            await this.sendMail(generate_otp);
            await this.userService.updateOtp(getAllByMail.id, { otp: generate_otp });
            res.status(common_1.HttpStatus.OK).json({
                message: "otp sent to mail...."
            });
        }
        catch (error) {
            res.json({
                message: "Something Went Wrong..."
            });
        }
    }
    async verify_Otp(body, req, res) {
        try {
            const email = body.email;
            const otp = body.otp;
            const getAllByEmail = await this.userService.getAllByEmail(email);
            console.log(getAllByEmail);
            if (getAllByEmail.otp == otp) {
                return res.status(common_1.HttpStatus.OK).json({
                    message: "otp verified successfully"
                });
            }
            else {
                res.json({
                    message: "invalid otp..."
                });
            }
        }
        catch (error) {
            res.json({
                message: "Something Went Wrong..."
            });
        }
    }
    async reset_Password(body, req, res) {
        try {
            console.log(body);
            const pass = body.newPassword;
            console.log(pass);
            console.log("resetPassword");
            const hash_password = await (0, bcrypt_1.hash)(pass, 10);
            console.log(hash_password);
            const email = body.email;
            const getAllByEmail = await this.userService.getAllByEmail(email);
            console.log("inside reset pass", getAllByEmail);
            await this.userService.updatePass(getAllByEmail.id, { password: hash_password });
            res.status(common_1.HttpStatus.OK).json({
                message: "password reset successfully"
            });
        }
        catch (error) {
            res.json({
                message: "Something Went Wrong..."
            });
        }
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(+id);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
    sendMail(otp) {
        const transpoter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b64a22a6852062",
                pass: "f231a26b936636"
            }
        });
        var mailOptions = {
            from: "k12564290@gmail.com",
            to: "k12564290@gmail.com",
            subject: "hii ragul",
            html: "Verify Code :" + otp
        };
        transpoter.sendMail(mailOptions, function (error, results) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + results.response);
            }
        });
    }
};
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("verify"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("sendOtp"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "send_Otp", null);
__decorate([
    (0, common_1.Post)("verifyOtp"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify_Otp", null);
__decorate([
    (0, common_1.Post)("resetPassword"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reset_Password", null);
__decorate([
    (0, common_1.Get)("getall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
function Compare(password, password1) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=user.controller.js.map