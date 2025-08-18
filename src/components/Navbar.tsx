import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Plus, Building2 } from 'lucide-react';

export const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { href: '/', label: 'Bosh sahifa', icon: Home },
        { href: '/create', label: 'Joy qo\'shish', icon: Plus },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-elegant transition-smooth">
                            <Building2 className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                                Gulistan Life
                            </h1>
                            <p className="text-xs text-muted-foreground">Ko'chmas mulk platformasi</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant={isActive ? "default" : "ghost"}
                                    className="gap-2"
                                >
                                    <Link to={item.href}>
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>

                    {/* Mobile menu */}
                    <div className="flex md:hidden items-center space-x-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant={isActive ? "default" : "ghost"}
                                    size="icon"
                                >
                                    <Link to={item.href}>
                                        <Icon className="w-4 h-4" />
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};