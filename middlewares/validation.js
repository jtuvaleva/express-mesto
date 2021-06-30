const { celebrate, Joi } = require('celebrate');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().allow('').default('Жак-Ив Кусто')
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
    about: Joi.string().allow('').default('Исследователь').min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
    avatar: Joi.string().allow('').uri().min(10)
      .messages({
        'string.min': 'Минимальная длина поля 10 символов',
        'string.uri': 'Некорректная ссылка для аватара пользователя',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Некорректный email',
        'string.empty': 'Заполните необходимое поле email',
        'any.required': 'Заполните необходимое поле email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Заполните необходимое поле password',
        'any.required': 'Заполните необходимое поле password',
      }),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Некорректный email',
        'string.empty': 'Заполните необходимое поле email',
        'any.required': 'Заполните необходимое поле email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Заполните необходимое поле password',
        'any.required': 'Заполните необходимое поле password',
      }),
  }),
});

module.exports.validateUpdateProfileEntry = celebrate({
  body: Joi.object().keys({
    name: Joi.string().not('')
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
        'any.invalid': 'Поле должно быть заполненным',
      }),
    about: Joi.string().invalid('')
      .min(2)
      .max(30)
      .messages({
        'any.invalid': 'Поле должно быть заполненным',
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
  }),
});

module.exports.validateUpdateAvatarEntry = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().allow('').uri().min(10)
      .messages({
        'string.min': 'Минимальная длина поля 10 символов',
        'string.uri': 'Некорректная ссылка для аватара пользователя',
        'any.invalid': 'Поле должно быть заполненным',
      }),
  }),
});

module.exports.validateCardEntry = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символa',
        'string.max': 'Максимальная длина поля 30 символов',
        'string.empty': 'Название должно быть заполненным',
        'any.required': 'Добавьте название для места',
      }),
    link: Joi.string().required().uri()
      .messages({
        'string.uri': 'Некорректная ссылка',
        'string.empty': 'Добавьте ссылку на изображение',
        'any.required': 'Добавьте ссылку на изображение',
      }),
  }),
});
