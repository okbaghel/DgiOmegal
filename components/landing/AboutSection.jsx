import { Shield, Zap, Globe } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-secondary/20 p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Connection</h3>
            <p className="text-muted-foreground">
              Click to join and you'll be instantly matched with a random stranger from anywhere in the world. No waiting rooms, no delays.
            </p>
          </div>
          
          <div className="bg-secondary/20 p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-muted-foreground">
              Meet people from different cultures and backgrounds. Practice languages, share stories, or just have fun conversations.
            </p>
          </div>
          
          <div className="bg-secondary/20 p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              Your privacy is our priority. No personal data stored, no tracking, and no accounts needed. Stay completely anonymous.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Our Guidelines</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            While we encourage free expression, please keep interactions respectful. Report any inappropriate behavior through our built-in tools. Let's create a safe and enjoyable space for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}