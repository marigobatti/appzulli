import * as Joi from 'joi';
import { ObjUtil } from './ObjUtil';

export class ValidationUtil {

    public validateData(data: any, schema: Joi.SchemaLike) {
        const options = { abortEarly: false };
        const errors = Joi.validate(data, schema, options);

        return errors.error ?
            this.buildUsefulErrorObject(errors.error.details) :
            false;
    }

    private buildUsefulErrorObject(errors: any) {
        const errosCampos = new Map<string, object[]>();

        errors.map((error, index) => {
            errosCampos
            .set(error.path.join('_'),
                 errors.filter((err) => err.path.join('_') === error.path.join('_'))
                       .map((err) => ({type: err, context: err.context, message: err.message})));
        });

        return ObjUtil.mapToObj(errosCampos);
    }

}