import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import {renderNumber} from "../utils/utils";
import {useAddFood} from "../customeHooks/useAddFood";


export const ShowAddedFood = () => {
    const { foods, removeFood } = useAddFood();
    return <>
        {foods.products.length === 0 && foods?.recipes.length === 0 &&
            <div className="grid items-center text-center justify-center my-3 py-5 bg-diaDarkBlue rounded-xl">
                <h2 className={"text-xl font-poppins text-gray-500 font-semibold"}>Oops!</h2>
                <p className={"font-poppins text-sm text-gray-500"}>You didn't add food yet</p>
            </div>}
        {foods.products.length > 0 && (
            <>
                <h4 className="font-sourceCode text-diaGray text-xs">Products</h4>
                <div className="rounded-lg my-3 bg-diaDarkBlue">
                    {foods.products.map((product) => {
                        const carbsPerUnit = product.nutriments.carbohydrates_100g * product.qty / 100;
                        return (
                            <div key={product.product_name}
                                 className="relative flex items-center justify-between mx-2 px-2 border-t-2 border-gray-700">
                                <div className="mx-2 p-2">
                                    <h1 className="text-blue-500 font-poppins">{`${product.product_name}`}</h1>
                                    <p className="text-gray-500 font-poppins">
                                        {`${product.qty}${product.quantity?.match(/[a-zA-Z]+/g) || ""}
                           (${carbsPerUnit}g * ${product.units} = ${renderNumber(carbsPerUnit * product.units)}g carbs)`}
                                    </p>
                                </div>
                                <Button
                                    className="self-center"
                                    onClick={() => {
                                        removeFood({
                                            primaryKey: "product_name",
                                            itemType: "products",
                                            primaryKeyValue: product.product_name
                                        });
                                    }}
                                >
                                    <Icon icon="ic:outline-delete" className="text-diaGray h-7 w-7"/>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </>
        )}
        {foods.recipes.length > 0 && (
            <>
                <h4 className="font-sourceCode text-diaGray text-xs">Recipes</h4>
                <div className="rounded-lg my-3 bg-diaDarkBlue">
                    {foods.recipes.map((recipe) => {
                        const {id, units} = recipe
                        recipe = recipe.attributes;
                        return (
                            <div key={recipe.name}
                                 className="relative flex items-center justify-between mx-2 px-2 border-t-2 border-gray-700">
                                <div className="mx-2 p-2">
                                    <h1 className="text-blue-500 font-poppins">{recipe.name}</h1>
                                    <p className="text-gray-500 font-poppins">
                                        {recipe.carbs}g * {units} = {renderNumber(recipe.carbs * units)}g carbs
                                    </p>
                                </div>
                                <Button
                                    className="self-center"
                                    onClick={() => {
                                        removeFood({
                                            primaryKey: "id",
                                            itemType: "recipes",
                                            primaryKeyValue: id
                                        });
                                    }}
                                >
                                    <Icon icon="ic:outline-delete" className="text-diaGray h-7 w-7"/>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </>
        )}
        {foods.nutritions.length > 0 && (
            <>
                <h4 className="font-sourceCode text-diaGray text-xs">Fruits & Vegetables</h4>
                <div className="rounded-lg my-3 bg-diaDarkBlue">
                    {foods.nutritions.map((nutrition) => {
                        return (
                            <div key={nutrition.name}
                                 className="relative flex items-center justify-between mx-2 px-2 border-t-2 border-gray-700">
                                <div className="mx-2 p-2">
                                    <h1 className="text-blue-500 font-poppins">{nutrition.name}</h1>
                                    <p className="text-gray-500 font-poppins">
                                        {nutrition.carbohydrates_total_g}g
                                        * {nutrition.units} = {renderNumber(nutrition.carbohydrates_total_g * nutrition.units)}g
                                        carbs
                                    </p>
                                </div>
                                <Button
                                    className="self-center"
                                    onClick={() => {
                                        removeFood({
                                            primaryKey: "name",
                                            itemType: "nutritions",
                                            primaryKeyValue: nutrition.name
                                        });
                                    }}
                                >
                                    <Icon icon="ic:outline-delete" className="text-diaGray h-7 w-7"/>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </>
        )}
    </>
}