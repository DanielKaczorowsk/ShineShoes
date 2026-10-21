import { PhotoIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";


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

const category = ["sportowe", "klasyczne", "glany"]
const size = [37,38,39]
const color = ["zielony" , "czarny"]

const FormProduct = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState('');
    const [isServerLoading, setIsServerLoading] = useState(false);
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

        setStatus('');
        setIsServerLoading(true);

        const filteredVariants = productData.variantProduct.filter(v =>
            v.size && v.color && v.quantity > 0
        );

        if (filteredVariants.length === 0) {
            setStatus("Dodaj przynajmniej jeden wariant");
            setIsServerLoading(false)
            return;
        }

        if (hasDuplicates(filteredVariants)) {
            setStatus("Duplikaty wariantów (size + color)");
            setIsServerLoading(false)
            return;
        }
        const response = await productProvider(productData, filteredVariants, img);
        setStatus('success')
        if (response && response.items) {
            setTimeout(() => {
                navigate('/dashboard');
                setStatus('')
            }, 1500);
        }
        setIsServerLoading(false)
    };
    return (
        <form onSubmit={handleSubmit} method="POST" className="min-h-full bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Dodaj produkt
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Uzupełnij informacje o produkcie, dodaj zdjęcia i skonfiguruj warianty.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-100 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Informacje podstawowe
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Podstawowe dane produktu widoczne w sklepie.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                            <div>
                                <label
                                    htmlFor="nameProduct"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Nazwa produktu
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="nameProduct"
                                        name="name"
                                        type="text"
                                        value={productData.name}
                                        onChange={handleChange}
                                        placeholder="np. Nike Air Max"
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2
                                                   text-sm text-gray-900 shadow-sm placeholder:text-gray-400
                                                   transition
                                                   focus:border-indigo-500 focus:outline-none focus:ring-2
                                                   focus:ring-indigo-500/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="modelProduct"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Model produktu
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="modelProduct"
                                        name="model"
                                        type="text"
                                        value={productData.model}
                                        onChange={handleChange}
                                        placeholder="np. Air Max 270"
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2
                                                   text-sm text-gray-900 shadow-sm placeholder:text-gray-400
                                                   transition
                                                   focus:border-indigo-500 focus:outline-none focus:ring-2
                                                   focus:ring-indigo-500/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Cena
                                </label>

                                <div className="mt-2">
                                    <InputGroup
                                        className="rounded-lg border border-gray-300 bg-white shadow-sm
                                                   focus-within:border-indigo-500
                                                   focus-within:ring-2 focus-within:ring-indigo-500/20"
                                    >
                                        <InputGroupInput
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={productData.price}
                                            onChange={(e) =>
                                                setProductData({
                                                    ...productData,
                                                    price: Number(e.target.value)
                                                })
                                            }
                                            placeholder="0.00"
                                            className="border-0 shadow-none focus:ring-0"
                                        />

                                        <InputGroupAddon align="inline-end">
                                            <InputGroupText className="text-gray-500">
                                                PLN
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Kategorie
                                </label>

                                <div className="mt-2">
                                    <Combobox
                                        multiple
                                        autoHighlight
                                        items={category}
                                        value={productData.category}
                                        onValueChange={(val) =>
                                            setProductData({
                                                ...productData,
                                                category: val
                                            })
                                        }
                                    >
                                        <ComboboxChips
                                            ref={anchorCategory}
                                            className="min-h-10 w-full rounded-lg border border-gray-300
                                                       bg-white px-2 py-1.5 shadow-sm
                                                       focus-within:border-indigo-500
                                                       focus-within:ring-2 focus-within:ring-indigo-500/20"
                                        >
                                            <ComboboxValue>
                                                {(values) => (
                                                    <>
                                                        {values.map((value) => (
                                                            <ComboboxChip
                                                                key={value}
                                                                className="rounded-md bg-indigo-50
                                                                           text-indigo-700"
                                                            >
                                                                {value}
                                                            </ComboboxChip>
                                                        ))}

                                                        <ComboboxChipsInput
                                                            placeholder={
                                                                productData.category.length === 0
                                                                    ? "Wybierz kategorie"
                                                                    : ""
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </ComboboxValue>
                                        </ComboboxChips>

                                        <ComboboxContent anchorCategory={anchorCategory}>
                                            <ComboboxEmpty>
                                                Brak wyników.
                                            </ComboboxEmpty>

                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-100 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Opis produktu
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Dodaj informacje, które pomogą klientowi poznać produkt.
                            </p>
                        </div>

                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            value={productData.description}
                            onChange={handleChange}
                            placeholder="Opisz produkt — materiał, dopasowanie, przeznaczenie..."
                            className="block w-full resize-y rounded-lg border border-gray-300
                                       bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm
                                       placeholder:text-gray-400
                                       transition
                                       focus:border-indigo-500 focus:outline-none
                                       focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    <div className="border-b border-gray-100 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Zdjęcia produktu
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Dodaj zdjęcia, które będą wyświetlane na stronie produktu.
                            </p>
                        </div>

                        <div
                            className="group flex cursor-pointer justify-center rounded-xl
                                       border-2 border-dashed border-gray-300
                                       bg-gray-50 px-6 py-12
                                       transition hover:border-indigo-400 hover:bg-indigo-50/30"
                        >
                            <div className="text-center">

                                <div className="mx-auto flex h-12 w-12 items-center justify-center
                                                rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                                    <PhotoIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-gray-400
                                                   transition group-hover:text-indigo-500"
                                    />
                                </div>

                                <div className="mt-4 flex justify-center text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer font-semibold text-indigo-600
                                                   hover:text-indigo-500"
                                    >
                                        <span>Wybierz zdjęcia</span>

                                        <input
                                            className="sr-only"
                                            id="file-upload"
                                            type="file"
                                            multiple
                                            accept="image/png, image/jpeg, image/gif"
                                            onChange={handleFileChange}
                                        />
                                    </label>

                                    <span className="pl-1">
                                        lub przeciągnij je tutaj
                                    </span>
                                </div>

                                <p className="mt-2 text-xs text-gray-500">
                                    Maks. 16 zdjęć · 5 MB każde · JPG, PNG lub GIF
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-100 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Warianty produktu
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Określ dostępne rozmiary, kolory oraz ilość produktów.
                            </p>
                        </div>

                        <div className="space-y-3">

                            {productData.variantProduct.map((variant, index) => (
                                <div
                                    key={index}
                                    className="flex flex-wrap items-center gap-3 rounded-lg
                                               border border-gray-200 bg-gray-50/50 p-3
                                               transition hover:border-gray-300 hover:bg-gray-50"
                                >

                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center
                                                     rounded-full bg-gray-100 text-xs font-semibold
                                                     text-gray-500">
                                        {index + 1}
                                    </span>

                                    <select
                                        value={variant.size}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "size",
                                                e.target.value
                                                    ? Number(e.target.value)
                                                    : ""
                                            )
                                        }
                                        className="rounded-md border border-gray-200 bg-white
                                                   py-2 pr-8 pl-3 text-sm text-gray-900 shadow-sm
                                                   focus:border-indigo-500 focus:outline-none
                                                   focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value="">Rozmiar</option>
                                        {size.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={variant.color}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "color",
                                                e.target.value
                                            )
                                        }
                                        className="rounded-md border border-gray-200 bg-white
                                                   py-2 pr-8 pl-3 text-sm text-gray-900 shadow-sm
                                                   focus:border-indigo-500 focus:outline-none
                                                   focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value="">Kolor</option>
                                        {color.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Ilość"
                                        value={variant.quantity}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "quantity",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-24 rounded-md border border-gray-200
                                                   bg-white px-3 py-2 text-sm text-gray-900
                                                   shadow-sm placeholder:text-gray-400
                                                   focus:border-indigo-500 focus:outline-none
                                                   focus:ring-2 focus:ring-indigo-500/20"
                                    />

                                    {/* Remove */}
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        aria-label="Usuń wariant"
                                        className="ml-auto flex h-8 w-8 items-center justify-center
                                                   rounded-md text-gray-400
                                                   transition
                                                   hover:bg-red-50 hover:text-red-500"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add variant */}
                        <button
                            type="button"
                            onClick={addVariant}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg
                                       border border-gray-200 bg-white px-3 py-2
                                       text-sm font-semibold text-gray-700 shadow-sm
                                       transition
                                       hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Dodaj wariant
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-4 bg-gray-50 px-6 py-5 sm:flex-row
                                    sm:items-center sm:justify-between sm:px-8">

                        <div className="text-sm">
                            {status === "success" && (
                                <p className="font-medium text-green-600">
                                    Produkt został dodany.
                                </p>
                            )}

                            {status && status !== "success" && (
                                <p className="font-medium text-red-600">
                                    {status}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3">

                            <button
                                type="button"
                                className="rounded-lg px-4 py-2 text-sm font-semibold
                                           text-gray-700 transition hover:bg-white
                                           hover:text-gray-900"
                            >
                                Anuluj
                            </button>

                            <button
                                type="submit"
                                disabled={isServerLoading}
                                className="rounded-lg bg-gray-900 px-5 py-2.5
                                           text-sm font-semibold text-white shadow-sm
                                           transition hover:bg-gray-700
                                           focus:outline-none focus:ring-2
                                           focus:ring-gray-900 focus:ring-offset-2
                                           disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isServerLoading
                                    ? "Zapisywanie..."
                                    : "Zapisz produkt"}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormProduct