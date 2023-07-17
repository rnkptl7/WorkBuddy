import {
    Form as VForm,
    Field as VField,
    defineRule,
    ErrorMessage,
    configure,
} from "vee-validate";
import {
    required,
    numeric,
    min,
    max,
    alpha,
    integer,
    url as URL,
    email,
    regex,
    confirmed,
    alpha_spaces as alphaSpaces,
    alpha_num as alphaNum,
} from "@vee-validate/rules";

export default {
    install(app) {
        app.component("VForm", VForm);
        app.component("VField", VField);
        app.component("ErrorMessage", ErrorMessage);

        defineRule("required", required);
        defineRule("min", min);
        defineRule("max", max);
        defineRule("alphaChar", alpha);
        defineRule("integer", integer);
        defineRule("URL", URL);
        defineRule("email", email);
        defineRule("regex", regex);
        defineRule("confirmed", confirmed);
        defineRule("select", required);
        defineRule("department", required);
        defineRule("gender", required);
        defineRule("alphaSpaces", alphaSpaces);
        defineRule("alphaNum", alphaNum);
        defineRule("numeric", numeric);

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The ${ctx.field} field is required.`,
                    min: `The ${ctx.field} field must contain minimum ${ctx.rule.params} letters.`,
                    max: `The ${ctx.field} field must not exceed ${ctx.rule.params} letters.`,
                    alphaChar: `The ${ctx.field} field may contain alphabetic characters`,
                    integer: `The ${ctx.field} field must be an integer.`,
                    numeric: `The ${ctx.field} field must be a numeric value`,
                    URL: `The ${ctx.field} field must be a URL`,
                    email: `The ${ctx.field} field must be valid an email`,
                    regex: `The ${ctx.field} field must contain at least one numeric digit and a special character`,
                    confirmed: `Password do not match`,
                    select: `Please select your suitable role`,
                    department: `Please select your department`,
                    gender: `Please choose a value`,
                    alphaSpaces: `The ${ctx.field} field may contain alphabetic characters`,
                };

                const message = messages[ctx.rule.name]
                    ? messages[ctx.rule.name]
                    : `The field ${ctx.field} is invalid`;
                return message;
            },
        });
    },
};
