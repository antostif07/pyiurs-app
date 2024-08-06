'use client'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import PyiursLogo from "./PyiursLogo";

export default function Menu() {
    return (
        <div className="flex justify-between">
            <PyiursLogo />
            <NavigationMenu>
                <NavigationMenuList className="flex gap-8">
                    <NavigationMenuItem>
                        <Link href="/audit" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Missions
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <Link href="/rh/assignments">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Affectations
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem> */}
                    {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Presences & Paiements</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                                <li>
                                    <Link  className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")} href={"/rh/attendances"}>
                                        <NavigationMenuLink asChild>                                    
                                            <div className="text-sm font-medium leading-none">Presences</div>
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link  className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")} href={"/rh/payments"}>
                                        <NavigationMenuLink asChild>                                    
                                            <div className="text-sm font-medium leading-none">Paiements</div>
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem> */}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
} 