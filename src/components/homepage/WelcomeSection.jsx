import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WelcomeSection() {
  const navigate = useNavigate();
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const slides = [
    {
      key: "welcome",
      title: "Explore Your Career Pathways",
      subtitle: "Five specialized tracks now live.",
      body: "Dive into General Engineering, Computer Engineering, Contract Specialist & Officer, Program Manager, and General Business & Industry pathways curated for your growth.",
      onClick: () => {},
    },
    {
      key: "general-engineering",
      title: "General Engineering Roadmap",
      subtitle: "Sharpen core engineering skills.",
      body: "Access labs, standards briefings, and rotational experiences designed to reinforce systems thinking and cross-discipline collaboration.",
      ctaLabel: "View roadmap",
      onClick: () => navigate("/catalog?track=general-engineering"),
    },
    {
      key: "computer-engineering",
      title: "Computer Engineering Innovation",
      subtitle: "Advance secure digital systems.",
      body: "Join code reviews, embedded systems sprints, and cybersecurity clinics focused on mission-ready computing solutions.",
      ctaLabel: "Launch track",
      onClick: () => navigate("/catalog?track=computer-engineering"),
    },
    {
      key: "contracting",
      title: "Contract Specialists & Officers",
      subtitle: "Master acquisition excellence.",
      body: "Follow structured microlearning on FAR updates, negotiation labs, and lifecycle oversight to accelerate certification milestones.",
      ctaLabel: "Open toolkit",
      onClick: () => navigate("/resources?topic=contracting"),
    },
    {
      key: "program-managers",
      title: "Program Managers Hub",
      subtitle: "Lead complex portfolios with confidence.",
      body: "Tap into risk dashboards, integrated baseline clinics, and leadership roundtables aligned to defense acquisition guidelines.",
      ctaLabel: "Enter hub",
      onClick: () => navigate("/groups?focus=program-management"),
    },
    {
      key: "business-industry",
      title: "Business & Industry Professionals",
      subtitle: "Strengthen enterprise operations.",
      body: "Explore financial stewardship labs, supply-chain simulations, and policy forums tailored to enterprise support teams.",
      ctaLabel: "See resources",
      onClick: () => navigate("/catalog?track=business-industry"),
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (api) {
      api.scrollPrev();
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <section className="mb-4">
      <Card className="w-full shadow-sm">
        <CardContent className="p-4">
          <div className="relative group">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="flex">
                {slides.map((slide, idx) => (
                  <CarouselItem
                    key={slide.key}
                    className="w-full flex-shrink-0 cursor-pointer"
                    onClick={slide.onClick}
                    tabIndex={0}
                    role="button"
                    aria-label={slide.title}
                  >
                    <div className="bg-blue-600 rounded-2xl text-white flex flex-col md:flex-row items-center p-4 min-h-[160px] transition-shadow hover:shadow-lg relative overflow-hidden">
                      <div className="flex-1 min-w-0 z-10 pr-2">
                        <p className="font-bold text-lg mb-1">{slide.title}</p>
                        {slide.subtitle && <p className="mb-1 text-base">{slide.subtitle}</p>}
                        <p className="mb-3 text-sm leading-relaxed">{slide.body}</p>
                        {slide.ctaLabel && (
                          <button
                            className="mt-1 px-3 py-1.5 bg-white text-blue-600 rounded-full font-semibold shadow text-sm hover:scale-105 transition-transform"
                            onClick={e => {
                              e.stopPropagation();
                              slide.onClick();
                            }}
                          >
                            {slide.ctaLabel}
                          </button>
                        )}
                      </div>
                      {slide.imgSrc && (
                        <div className="hidden md:block ml-4 relative flex-shrink-0">
                          <img
                            src={slide.imgSrc}
                            alt=""
                            className="w-32 h-24 rounded-lg object-cover border-2 border-blue-400/30 bg-white/10 backdrop-blur-sm"
                            draggable={false}
                          />
                        </div>
                      )}
                      {!slide.ctaLabel && !slide.imgSrc && (
                        <span className="mt-3 md:mt-0 flex items-center justify-center">
                          <span className="inline-flex h-8 w-8 bg-white/20 rounded-full text-white shadow-lg items-center justify-center backdrop-blur-sm">
                            <ArrowRight size={16} />
                          </span>
                        </span>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-50">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/95 border-white/30 hover:bg-white hover:scale-110 shadow-lg transition-all duration-200 backdrop-blur-sm"
                  onClick={handlePrevClick}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700" />
                </Button>
              </div>
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/95 border-white/30 hover:bg-white hover:scale-110 shadow-lg transition-all duration-200 backdrop-blur-sm"
                  onClick={handleNextClick}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </Button>
              </div>
            </Carousel>
            
            <div className="flex items-center justify-center gap-2 mt-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === current - 1 ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => api?.scrollTo(idx)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}