
import { Star, Quote } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Michael Roberts",
      branch: "Army",
      role: "E-commerce Store Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      quote: "The structured approach reminded me of my military training. Within 3 months of graduating, my online store was generating $4,500 monthly.",
      stars: 5
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      branch: "Navy",
      role: "Digital Marketing Agency Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      quote: "I leveraged my leadership skills from the Navy to build a team of 6 freelancers. My agency now serves 12 clients with consistent growth.",
      stars: 5
    },
    {
      id: 3,
      name: "David Chen",
      branch: "Marines",
      role: "SaaS Business Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      quote: "The program helped me translate my disciplined approach into building software solutions. I've created recurring revenue that supports my family.",
      stars: 5
    }
  ];

  return (
    <section id="success-stories" className="py-24 bg-military-sand">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          MISSION ACCOMPLISHED: VETERAN SUCCESS STORIES
        </h2>
        <p className="section-subtitle">
          Real results from veterans who've successfully transitioned to business owners
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <div key={story.id} className="combat-card relative">
              <div className="absolute -right-2 -top-2 rounded-full bg-military-navy p-2 text-military-sand">
                <Quote className="h-5 w-5" />
              </div>
              
              <div className="flex flex-col items-center text-center">
                <img
                  src={story.image}
                  alt={story.name}
                  className="mb-4 h-20 w-20 rounded-full object-cover border-2 border-military-olive"
                />
                
                <h3 className="font-heading text-xl font-bold text-military-navy">
                  {story.name}
                </h3>
                
                <p className="text-sm text-military-navy/70">
                  {story.branch} Veteran
                </p>
                
                <p className="mb-4 text-sm font-medium text-military-olive">
                  {story.role}
                </p>
                
                <div className="mb-4 flex">
                  {[...Array(story.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-military-olive text-military-olive"
                    />
                  ))}
                </div>
                
                <blockquote className="text-military-navy/80">
                  "{story.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-military-navy p-8 text-center">
          <h3 className="mb-4 font-heading text-2xl font-bold text-military-sand">
            JOIN 450+ VETERANS WHO HAVE SUCCESSFULLY DEPLOYED THEIR BUSINESS MISSION
          </h3>
          <p className="mb-6 text-military-sand/80">
            Our structured program has a proven track record of helping veterans like you transition successfully into entrepreneurship.
          </p>
          <a
            href="#enlist"
            className="inline-block rounded-md bg-military-olive px-6 py-3 font-medium text-military-sand shadow-sm transition-colors hover:bg-military-olive/90"
          >
            START YOUR MISSION
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
