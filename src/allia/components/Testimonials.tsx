
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Product Manager",
      company: "TechFlow",
      avatar: "👩‍💼",
      quote: "Allia saved me 2 hours per week. I can finally find that important email from 3 months ago in seconds!",
      metric: "2h/week saved",
      color: "from-brand-turquoise to-brand-blue"
    },
    {
      name: "Thomas Chen",
      role: "Engineering Lead",
      company: "StartupLab",
      avatar: "👨‍💻",
      quote: "No more switching between 5 different tools to find documentation. Everything is accessible from one search.",
      metric: "90% faster search",
      color: "from-brand-blue to-purple-500"
    },
    {
      name: "Sarah Williams",
      role: "Marketing Director",
      company: "GrowthCorp",
      avatar: "👩‍🎨",
      quote: "The proactive suggestions are incredible. Allia knows what I need before my meetings even start.",
      metric: "Zero prep time",
      color: "from-brand-orange to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 px-4 py-2 rounded-2xl">
            Testimonials
          </Badge>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-brand-darkGrey">
            Loved by teams everywhere
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            See how Allia is transforming the way people work with information
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-8 border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color}`}></div>
              
              <div className="space-y-6">
                {/* Quote */}
                <div className="space-y-4">
                  <div className="text-brand-turquoise text-2xl">"</div>
                  <p className="text-gray-700 font-inter leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Metric Badge */}
                <Badge className={`bg-gradient-to-r ${testimonial.color} text-white border-0 px-4 py-1 rounded-2xl`}>
                  {testimonial.metric}
                </Badge>

                {/* Profile */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-darkGrey">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <Card className="p-8 bg-gradient-to-r from-brand-turquoise/5 to-brand-blue/5 border-0 rounded-3xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-brand-turquoise font-poppins">
                  500+
                </div>
                <p className="text-gray-600 font-inter">Teams using Allia</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-brand-blue font-poppins">
                  2.5h
                </div>
                <p className="text-gray-600 font-inter">Average time saved/week</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-brand-orange font-poppins">
                  95%
                </div>
                <p className="text-gray-600 font-inter">User satisfaction</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-brand-turquoise font-poppins">
                  10M+
                </div>
                <p className="text-gray-600 font-inter">Searches performed</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
