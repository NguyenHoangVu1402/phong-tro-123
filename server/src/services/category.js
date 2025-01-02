import db from '../models';

// Get all categories
export const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Ok' : 'Không lấy được danh mục',
            response,
        })
    } catch (error) {
        reject(error);
    }
});