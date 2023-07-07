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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../auth/auth.service");
const product_entity_1 = require("../entity/product.entity");
const cart_entity_1 = require("../entity/cart.entity");
let UsersService = class UsersService {
    constructor(usersRepository, authService, productsRepository, cartRepository) {
        this.usersRepository = usersRepository;
        this.authService = authService;
        this.productsRepository = productsRepository;
        this.cartRepository = cartRepository;
    }
    async signUp(user) {
        var checkExistingEmail = await this.usersRepository.findOne({ where: { email: user.email } });
        if (checkExistingEmail)
            throw new common_1.BadRequestException("User with provided email id already exists");
        var newUser = new user_entity_1.UserEntity();
        var cart = new cart_entity_1.CartEntity();
        cart.cartItems = [];
        cart.user = newUser;
        await this.cartRepository.save(cart);
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.cart = cart;
        await this.usersRepository.save(newUser);
        return this.authService.generateAccessToken(user);
    }
    async login(reqUser) {
        var user = await this.usersRepository.findOne({ where: { email: reqUser.email } });
        if (!user) {
            throw new common_1.UnauthorizedException("Incorrect email or password");
        }
        if (!(await bcrypt.compare(reqUser.password, user.password))) {
            throw new common_1.UnauthorizedException("Incorrect email or password");
        }
        return this.authService.generateAccessToken(user);
    }
    async getCart(userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid Credentials");
        }
        return user.cart.cartItems;
    }
    async updateCart(userId, cartItems) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid Credentials");
        }
        var cart = [];
        cartItems.forEach(async ({ productId, count }) => {
            var product = await this.productsRepository.findOne({ where: { id: productId } });
            if (product) {
                cart.push({ item: product, count });
            }
        });
        user.cart.cartItems = cart;
        await this.usersRepository.save(user);
        return {
            cart,
            message: 'Cart Updated'
        };
    }
    async addToCart(userId, cartItem) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid Credentials");
        }
        var cart = user.cart.cartItems;
        var product = await this.productsRepository.findOne({ where: { id: cartItem.item.id } });
        if (product) {
            cart.push(cartItem);
        }
        user.cart.cartItems = cart;
        await this.usersRepository.save(user);
        return {
            cart,
            message: 'Cart Updated'
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map