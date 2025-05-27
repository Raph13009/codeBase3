
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Chrome, Users, Building } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for individuals getting started",
      icon: Chrome,
      color: "from-gray-400 to-gray-600",
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
      features: [
        "1 user account",
        "3 tool integrations",
        "100 searches/month",
        "Basic search functionality",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "15",
      description: "For teams ready to boost productivity",
      icon: Users,
      color: "from-brand-turquoise to-brand-blue",
      buttonStyle: "bg-brand-turquoise hover:bg-brand-turquoise/90 text-white",
      popular: true,
      features: [
        "Up to 10 users",
        "Unlimited integrations",
        "Unlimited searches",
        "AI-powered suggestions",
        "Proactive notifications",
        "Priority support",
        "Team analytics"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with advanced needs",
      icon: Building,
      color: "from-brand-blue to-purple-600",
      buttonStyle: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
      features: [
        "Unlimited users",
        "Custom integrations",
        "Advanced security controls",
        "SSO & SCIM",
        "Dedicated account manager",
        "Custom training",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 px-4 py-2 rounded-2xl">
            Pricing
          </Badge>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-brand-darkGrey">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Start free, scale when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 border-0 shadow-lg rounded-3xl relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-brand-turquoise shadow-2xl scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-brand-turquoise to-brand-blue text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`space-y-6 ${plan.popular ? 'mt-8' : ''}`}>
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-xl text-brand-darkGrey">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2">
                    {plan.price === "Custom" ? (
                      <span className="text-3xl font-bold text-brand-darkGrey font-poppins">
                        Custom
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-brand-darkGrey font-poppins">
                          ${plan.price}
                        </span>
                        <span className="text-gray-600">/user/month</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-brand-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 font-inter text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 ${plan.buttonStyle}`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <Card className="p-6 bg-gradient-to-r from-green-50 to-brand-turquoise/5 border-0 rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <div className="text-left">
                <h4 className="font-poppins font-semibold text-brand-darkGrey">
                  30-day money-back guarantee
                </h4>
                <p className="text-gray-600 font-inter text-sm">
                  Try Allia risk-free. If you're not satisfied, get a full refund.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
