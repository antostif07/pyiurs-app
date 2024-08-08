'use client'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import PyiursLogo from "@/src/ui/PyiursLogo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RhMenu() {
    const pathname = usePathname()

    return (
        <div className="flex justify-between">
            <PyiursLogo />
            <Sheet>
                <SheetTrigger className="sm:hidden flex">
                    <HamburgerMenuIcon />
                </SheetTrigger>
                <SheetContent>
                    <div className="flex flex-col pt-8 gap-8">
                        <Link href="/rh">Employés</Link>
                        <Link href="/rh/assignments">Affectations</Link>
                        <Link href="/rh/attendances">Présences</Link>
                        <Link href="/rh/payments">Paiements</Link>
                    </div>
                </SheetContent>
            </Sheet>
            <NavigationMenu className="hidden sm:flex">
                <NavigationMenuList className="hidden sm:flex gap-8">
                    <NavigationMenuItem>
                        <Link href="/rh" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Employés
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/rh/assignments" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Affectations
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Presences & Paiements</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                                <li>
                                    <Link  className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")} href={"/rh/attendances"} legacyBehavior passHref>
                                        <NavigationMenuLink asChild>                                    
                                            <div className="text-sm font-medium leading-none">Présences</div>
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link  className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")} href={"/rh/payments"} legacyBehavior passHref>
                                        <NavigationMenuLink asChild>                                    
                                            <div className="text-sm font-medium leading-none">Paiements</div>
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                        {/* <Link href="/rh/attendances">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Presences & Paiements
                            </NavigationMenuLink>
                        </Link> */}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
} 