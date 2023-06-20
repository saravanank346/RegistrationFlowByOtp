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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let UserService = exports.UserService = class UserService {
    constructor(user_repository) {
        this.user_repository = user_repository;
    }
    async create(createUserDto) {
        await this.user_repository.save(createUserDto);
    }
    async getAllByEmail(email) {
        return await this.user_repository.findOne({ where: { email: email }, select: ["id", "name", "email", "phone", "otp", "password", "isverified", "loginAttempts", "blockTime"] });
    }
    async updateOtp(id, otp) {
        console.log("id", id);
        console.log("otp", otp);
        return await this.user_repository.update(id, otp);
    }
    async updatePass(id, pass) {
        console.log("id", id);
        console.log("pass", pass);
        return await this.user_repository.update(id, pass);
    }
    async updateAttempt(id, Attempts) {
        return await this.user_repository.update(id, { loginAttempts: Attempts });
    }
    async updateLoginAttempt(id, loginAttempts, blockTime) {
        return await this.update(id, { loginAttempts: loginAttempts, blockTime: blockTime });
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    async update(id, isVerified) {
        console.log("id", id);
        return await this.user_repository.update(id, isVerified);
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map