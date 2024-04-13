/**
 * Validates a product object for required fields and constraints.
 *
 * @param {Object} product - The product to be validated.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product's image.
 * @param {string} product.price - The price of the product.
 * @param {string[]} product.colors - The colors of the product.
 *
 * @returns {Object} - An object containing error messages for invalid fields.
 * @property {string} title - Error message for the title field.
 * @property {string} description - Error message for the description field.
 * @property {string} imageURL - Error message for the imageURL field.
 * @property {string} price - Error message for the price field.
 * @property {string} colors - Error message for the colors field.
 */
export const productValidation = (productObj: { title: string; description: string; imageURL: string; price: string; colors: string[]; }) => {
    const errors: { title: string; description: string; imageURL: string; price: string; colors: string } = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: "",
    };

    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(productObj.imageURL);

    if (!productObj.title.trim() || productObj.title.length < 10 || productObj.title.length > 80) {
        errors.title = 'Product title must be between  10 and 80 characters';
    }

    if (!productObj.description.trim() || productObj.description.length < 10 || productObj.description.length > 900) {
        errors.description = 'Product description must be between  10 and 900 characters';
    }

    if (!productObj.imageURL.trim() || !validUrl) {
        errors.imageURL = 'Product image URL is required';
    }

    if (!productObj.price.trim() || isNaN(Number(productObj.price))) {
        errors.price = 'Product price is required';
    }

    if (productObj.colors.length === 0 || !productObj.colors) {
        errors.colors = 'Product colors is required';
    }

    return errors;
}