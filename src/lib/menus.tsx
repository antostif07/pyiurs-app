import { BadgeDollarSign, Building2, DollarSignIcon, FileSpreadsheet, Fingerprint, Users } from "lucide-react";

export const rhMenus = [
    {
        name: "Employés", icon: <Users className="h-4 w-4" />, link: "/rh",
    },
    {
        name: "Affectations", icon: <Building2 className="h-4 w-4" />, link: "/rh/assignments",
    },
    {
        name: "Absences et temps de travail", icon: <Fingerprint className="h-4 w-4" />, link: "/rh/attendances",
    },
    // {
    //     name: "Primes et Dettes", icon: <DollarSignIcon className="h-4 w-4" />, link: "/rh/primes-debt",
    // },
    {
        name: "Vérifier les bulletins", icon: <FileSpreadsheet className="h-4 w-4" />, link: "/rh/pay-slips",
    },
    {
        name: "Cloturer la paie", icon: <BadgeDollarSign className="h-4 w-4" />, link: "/rh/payments",
    },
]