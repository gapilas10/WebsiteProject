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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyClipResolver = void 0;
const DummyClip_1 = require("../entities/DummyClip");
const type_graphql_1 = require("type-graphql");
const CreateDummyClipInput_1 = require("../inputs/CreateDummyClipInput");
const UpdateDummyClipInput_1 = require("../inputs/UpdateDummyClipInput");
let DummyClipResolver = class DummyClipResolver {
    dummyClips() {
        return DummyClip_1.DummyClip.find();
    }
    dummyClip(id) {
        return DummyClip_1.DummyClip.findOne({ where: { id } });
    }
    createDummyClip(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dummyClip = DummyClip_1.DummyClip.create(data);
            yield dummyClip.save();
            return dummyClip;
        });
    }
    updateDummyClip(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dummyClip = yield DummyClip_1.DummyClip.findOne({ where: { id } });
            if (!dummyClip)
                throw new Error("DummyClip not found!");
            Object.assign(dummyClip, data);
            yield dummyClip.save();
            return dummyClip;
        });
    }
    deleteDummyClip(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dummyClip = yield DummyClip_1.DummyClip.findOne({ where: { id } });
            if (!dummyClip)
                throw new Error("DummyClip not found!");
            yield dummyClip.remove();
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [DummyClip_1.DummyClip]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DummyClipResolver.prototype, "dummyClips", null);
__decorate([
    type_graphql_1.Query(() => DummyClip_1.DummyClip),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DummyClipResolver.prototype, "dummyClip", null);
__decorate([
    type_graphql_1.Mutation(() => DummyClip_1.DummyClip),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDummyClipInput_1.CreateDummyClipInput]),
    __metadata("design:returntype", Promise)
], DummyClipResolver.prototype, "createDummyClip", null);
__decorate([
    type_graphql_1.Mutation(() => DummyClip_1.DummyClip),
    __param(0, type_graphql_1.Arg("id")), __param(1, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateDummyClipInput_1.UpdateDummyClipInput]),
    __metadata("design:returntype", Promise)
], DummyClipResolver.prototype, "updateDummyClip", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DummyClipResolver.prototype, "deleteDummyClip", null);
DummyClipResolver = __decorate([
    type_graphql_1.Resolver()
], DummyClipResolver);
exports.DummyClipResolver = DummyClipResolver;
//# sourceMappingURL=dummyclip.js.map