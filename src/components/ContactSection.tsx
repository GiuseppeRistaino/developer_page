
import React, { useState } from 'react';
import { Linkedin, Github, Instagram, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors p-2"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};


/*
Per modifiche al template
https://dashboard.emailjs.com/
User: vrexas1@gmail.com
PW: la solita con più sicurezza
*/
const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        'service_la0afdc',
        'template_47c7ltn',
        {
          from_name: name,
          from_email: email,
          message: message,
        },
        'YGlLkitCYTHPBrccp'
      );

      toast.success("Messaggio inviato con successo! Ti risponderò presto.", {
        position: "bottom-right",
      });

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      toast.error("Errore durante l'invio. Riprova più tardi.", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-dark-surface">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Contatti</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-display font-bold mb-6">Let's Connect</h3>
            <p className="text-text-secondary mb-8">
              Sono sempre interessato a nuove opportunità, collaborazioni e sfide creative.
              Non esitare a contattarmi per discutere del tuo progetto o semplicemente
              per fare due chiacchiere.
            </p>
            
            <div className="space-y-4 mb-8">
              <SocialLink 
                href="mailto:vrexas.developer@gmail.com" 
                icon={<Mail size={20} className="text-highlight" />}
                label="vrexas.developer@gmail.com" 
              />
              <SocialLink 
                href="https://www.linkedin.com/in/giuseppe-ristaino-0b435b157/" 
                icon={<Linkedin size={20} className="text-highlight" />}
                label="LinkedIn" 
              />
              <SocialLink 
                href="https://github.com/GiuseppeRistaino" 
                icon={<Github size={20} className="text-highlight" />}
                label="GitHub" 
              />
              <SocialLink 
                href="https://www.instagram.com/vre.xas/" 
                icon={<Instagram size={20} className="text-highlight" />}
                label="Instagram" 
              />
            </div>
            {/* CV CURRICULUM
            <div className="bg-dark-card p-6 rounded-lg border border-dark-surface">
              <h4 className="font-bold mb-3">CV Download</h4>
              <p className="text-text-secondary text-sm mb-4">
                Scarica il mio curriculum completo in formato PDF.
              </p>
              <Button 
                variant="outline"
                className="border-highlight text-highlight hover:bg-highlight/10 w-full"
              >
                Download CV
              </Button>
            </div>
            */}
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="bg-dark-card p-6 md:p-8 rounded-lg border border-dark-surface shadow-xl">
              <h3 className="text-2xl font-display font-bold mb-6">Inviami un messaggio</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-text-secondary mb-2">Nome</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Il tuo nome"
                    className="bg-dark-surface border-dark-surface"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-text-secondary mb-2">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    className="bg-dark-surface border-dark-surface"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-text-secondary mb-2">Messaggio</label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Il tuo messaggio"
                    className="bg-dark-surface border-dark-surface min-h-[150px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-highlight hover:bg-highlight-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Invio...' : 'Invia Messaggio'} <Send size={16} className="ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
