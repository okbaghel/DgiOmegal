import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">StrangerChat</p>
            <p className="text-sm text-muted-foreground">Connect with the world, one chat at a time</p>
          </div>
          
          <nav className="flex gap-6">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Guidelines
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StrangerChat. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for connecting strangers worldwide</p>
        </div>
      </div>
    </footer>
  );
}