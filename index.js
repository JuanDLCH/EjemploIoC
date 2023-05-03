"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = exports.SmtpClient = void 0;
var inversify_1 = require("inversify");
require("reflect-metadata");
var SmtpClient = exports.SmtpClient = function () {
    var _classDecorators = [(0, inversify_1.injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SmtpClient = _classThis = /** @class */ (function () {
        function SmtpClient_1() {
        }
        SmtpClient_1.prototype.send = function (to, from, subject, body) {
            console.log("Sending email to ".concat(to, " with subject \"").concat(subject, "\" and body \"").concat(body, "\" from ").concat(from));
        };
        return SmtpClient_1;
    }());
    __setFunctionName(_classThis, "SmtpClient");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        SmtpClient = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmtpClient = _classThis;
}();
var EmailService = exports.EmailService = function () {
    var _classDecorators_1 = [(0, inversify_1.injectable)()];
    var _classDescriptor_1;
    var _classExtraInitializers_1 = [];
    var _classThis_1;
    var _instanceExtraInitializers = [];
    var _setSmtpClient_decorators;
    var EmailService = _classThis_1 = /** @class */ (function () {
        function EmailService_1(smtpClient) {
            this.smtpClient = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.smtpClient = smtpClient;
        }
        EmailService_1.prototype.setSmtpClient = function (smtpClient) {
            this.smtpClient = smtpClient;
        };
        EmailService_1.prototype.sendEmail = function (to, subject, body) {
            this.smtpClient.send(to, 'noreply@example.com', subject, body);
        };
        return EmailService_1;
    }());
    __setFunctionName(_classThis_1, "EmailService");
    (function () {
        _setSmtpClient_decorators = [(0, inversify_1.inject)('ISmtpClient')];
        __esDecorate(_classThis_1, null, _setSmtpClient_decorators, { kind: "method", name: "setSmtpClient", static: false, private: false, access: { has: function (obj) { return "setSmtpClient" in obj; }, get: function (obj) { return obj.setSmtpClient; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor_1 = { value: _classThis_1 }, _classDecorators_1, { kind: "class", name: _classThis_1.name }, null, _classExtraInitializers_1);
        EmailService = _classThis_1 = _classDescriptor_1.value;
        __runInitializers(_classThis_1, _classExtraInitializers_1);
    })();
    return EmailService = _classThis_1;
}();
var container = new inversify_1.Container();
container.bind('IEmailService').to(EmailService);
container.bind('ISmtpClient').to(SmtpClient);
var emailService = container.get('IEmailService');
emailService.sendEmail('example@example.com', 'Test Subject', 'Test Body');
