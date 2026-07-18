import { PhotoIcon } from '@heroicons/react/24/solid'
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "./ui/combobox"
import { productProvider } from '../api/ProductProvider';
import {InputGroup, InputGroupAddon, InputGroupInput, InputGroupText} from "./ui/input-group";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const data = [{}]
const category = ["sportowe", "klasyczne", "glany"]
const size = [37,38,39]
const color = ["zielony" , "czarny"]

const FormProduct = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [img, setImg] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        category: [],
        description: '',
        model: '',
        price: 0,
        variantProduct: [
            { size: "", color: "", quantity: 0 }
        ]
    });

    const anchorCategory = useComboboxAnchor();

    const addVariant = () => {
        setProductData(prev => ({
            ...prev,
            variantProduct: [
                ...prev.variantProduct,
                { size: "", color: "", quantity: 0 }
            ]
        }));
    };

    const removeVariant = (index) => {
        if (productData.variantProduct.length === 1) return;

        setProductData(prev => ({
            ...prev,
            variantProduct: prev.variantProduct.filter((_, i) => i !== index)
        }));
    };

    const hasDuplicates = (variants) => {
        const seen = new Set();

        for (let v of variants) {
            const key = `${v.size}-${v.color}`;
            if (seen.has(key)) return true;
            seen.add(key);
        }
        return false;
    };

    const handleVariantChange = (index, field, value) => {
        setProductData(prev => {
            const updated = [...prev.variantProduct];
            updated[index][field] = value;
            return { ...prev, variantProduct: updated };
        });
    };

    const handleChange = (e) => {
        setProductData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFileChange = (e) => {
        setImg(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess(false);

        const filteredVariants = productData.variantProduct.filter(v =>
            v.size && v.color && v.quantity > 0
        );

        if (filteredVariants.length === 0) {
            setError("Dodaj przynajmniej jeden wariant");
            return;
        }

        if (hasDuplicates(filteredVariants)) {
            setError("Duplikaty wariantów (size + color)");
            return;
        }
        console.log(productData);
        try {
            await productProvider(
                productData,
                filteredVariants,
                img
            );

            setSuccess(true);

            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

        } catch (err) {
            setError(err?.message || "Błąd dodawania produktu");
        }
    };
    return (
        <form onSubmit={handleSubmit} method="POST">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-base/7 font-semibold text-gray-900">Dodawanie produktów</h1>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="nameProduct" className="block text-sm/6 font-medium text-gray-900">
                                Nazwa Produktu
                            </label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <input
                                        id="nameProduct"
                                        name="name"
                                        type="text"
                                        value={productData.name}
                                        onChange = {handleChange}
                                        placeholder="Podaj nazwę produktu"
                                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="nameProduct" className="block text-sm/6 font-medium text-gray-900">
                                Model Produktu
                            </label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <input
                                        id="modelProduct"
                                        name="model"
                                        type="text"
                                        value={productData.model}
                                        onChange = {handleChange}
                                        placeholder="Podaj model produktu"
                                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                Cena
                            </label>
                            <div className="mt-2">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <InputGroupText>$</InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        name="price"
                                        value={productData.price}
                                        onChange={(e) =>
                                            setProductData({...productData, price: Number(e.target.value)})
                                        }
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupText>PLN</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                                Kategorie
                            </label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <Combobox
                                        multiple
                                        autoHighlight
                                        items={category}
                                        value={productData.category}
                                        onValueChange={(val) => setProductData({ ...productData, category: val })}
                                    >
                                        <ComboboxChips ref={anchorCategory} className="w-full max-w-xs">
                                            <ComboboxValue>
                                                {(values) => (
                                                    <>
                                                        {values.map((value) => (
                                                            <ComboboxChip key={value}>{value}</ComboboxChip>
                                                        ))}
                                                        <ComboboxChipsInput />
                                                    </>
                                                )}
                                            </ComboboxValue>
                                        </ComboboxChips>

                                        <ComboboxContent anchorCategory={anchorCategory}>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item} value={item}>
                                                        {item}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full mt-6">
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                Opis
                            </label>
                            <div className="mt-2">
                <textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                            </div>
                            <p className="mt-3 text-sm/6 text-gray-600">Opisz Produkt.</p>
                        </div>

                        <div className="col-span-full mt-6">
                            <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                Dodaj zdjęcia produktu
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                    <div className="mt-4 flex text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                                        >
                                            <span>Przeciągnij lub dodaj</span>
                                            <input
                                                className="sr-only"
                                                id="file-upload"
                                                type="file"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <p className="pl-1">do 16 zdjęć</p>
                                    </div>
                                    <p className="text-xs/5 text-gray-600">Dodaj zdjęcia do 5MB w formatach jpg, jpeg, png lub gif</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2 sm:col-start-1">
                            <div className="col-span-full mt-6">
                                <label className="block text-sm font-medium text-gray-900">
                                    Warianty
                                </label>

                                {productData.variantProduct.map((variant, index) => (
                                    <div key={index} className="flex gap-4 mt-2 items-center">

                                        <select
                                            value={variant.size}
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "size",
                                                    e.target.value ? Number(e.target.value) : ""
                                                )
                                            }
                                            className="border p-2 rounded"
                                        >
                                            <option value="">Rozmiar</option>
                                            {size.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>

                                        <select
                                            value={variant.color}
                                            onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                                            className="border p-2 rounded"
                                        >
                                            <option value="">Kolor</option>
                                            {color.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>

                                        <input
                                            type="number"
                                            placeholder="Ilość"
                                            value={variant.quantity}
                                            onChange={(e) => handleVariantChange(index, "quantity", Number(e.target.value))}
                                            className="border p-2 rounded w-24"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="text-red-500"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="mt-3 px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    ➕ Dodaj wariant
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm/6 font-semibold text-gray-900">
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Zapisz
                        </button>
                        {success && <p className="text-green-500">Dodano produkt</p>}
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </div>
            </div>
        </form>


    )
}

export default FormProduct