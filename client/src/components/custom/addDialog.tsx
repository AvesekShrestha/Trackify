import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ITransactionRequest } from "@/types/income.types";
import api from "@/utils/axios";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface DialogProp {
    type: string;
    text: string;
    title: string;
}

export default function AddDialog({ type, text, title }: DialogProp) {
    const incomeOptions = [
        { value: "salary", label: "Salary" },
        { value: "freelance", label: "Freelance" },
        { value: "investment", label: "Investment" },
        { value: "business", label: "Business" },
        { value: "other", label: "Other" },
    ];

    const expenseOptions = [
        { value: "food", label: "Food" },
        { value: "transport", label: "Transport" },
        { value: "entertainment", label: "Entertainment" },
        { value: "health", label: "Health" },
        { value: "shopping", label: "Shopping" },
        { value: "bills", label: "Bills" },
        { value: "other", label: "Other" },
    ];

    const options =
        type.toLowerCase() === "income" ? incomeOptions : expenseOptions;

    const client = useQueryClient();

    const saveMutation = useMutation({
        mutationFn: async (payload: ITransactionRequest) => {
            await api.post(`/${type}/`, payload);
        },
        onSuccess() {
            client.invalidateQueries({ queryKey: [type.toLowerCase()] });
            client.invalidateQueries({ queryKey: ["recent"] });
            client.invalidateQueries({ queryKey: ["balance"] });
            client.invalidateQueries({ queryKey: ["monthlyIncome"] });
            client.invalidateQueries({ queryKey: ["monthlyExpense"] });
            toast("Successfully Added")

        },
        onError(error: any) {
            console.log(error)
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong. Please try again.";
            toast.error(`${message}`);
        }
    });

    const defaultValues =
        type.toLowerCase() === "income"
            ? { source: "", amount: 0, description: "" }
            : { category: "", amount: 0, description: "" };

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ITransactionRequest>({
        defaultValues,
    });

    const onSubmit: SubmitHandler<ITransactionRequest> = (data) => {
        saveMutation.mutate(data);
        reset(defaultValues);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-md flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>{text}</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {type === "income"
                            ? "Create and track your income"
                            : "Create and track your expense"}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 py-2"
                >
                    {/* Source / Category */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            {type.toLowerCase() === "income"
                                ? "Source"
                                : "Category"}
                        </label>
                        <Controller
                            control={control}
                            name={`${type.toLowerCase() === "income"
                                    ? "source"
                                    : "category"
                                }`}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.source && (
                            <span className="text-red-500 text-sm">
                                {errors.source.message}
                            </span>
                        )}
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <Controller
                            control={control}
                            name="amount"
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
                            )}
                        />
                        {errors.amount && (
                            <span className="text-red-500 text-sm">
                                {errors.amount.message}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Textarea
                                    placeholder="Short description (optional)"
                                    className="h-20"
                                    {...field}
                                />
                            )}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => reset(defaultValues)}
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <DialogClose asChild>
                            <Button
                                type="submit"
                                className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white"
                            >
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

