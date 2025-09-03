import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Target, Shield, Star, Languages, Volume2, Play, Pause } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const DreamsUnderstanding = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentSection, setCurrentSection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showDreamBuilder, setShowDreamBuilder] = useState(false);
  const [userDreams, setUserDreams] = useState([]);
  const [newDream, setNewDream] = useState('');

  // Language options
  const languageOptions = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' }
  ];

  // Content based on selected language
  const content = {
    en: {
      title: 'Understanding Your Dreams',
      description: 'Discover what financial security means for your family\'s future',
      sections: [
        {
          title: 'What Are Your Dreams?',
          icon: Heart,
          color: 'bg-pink-500',
          summary: 'Identifying your deepest aspirations and goals',
          details: `Dreams are the foundation of everything we do. They represent our hopes, aspirations, and the future we want to create for ourselves and our families.

Think about what truly matters to you:
• Your children's education and future
• A comfortable retirement
• A home that feels like a sanctuary
• The ability to help others
• Financial freedom and peace of mind

These aren't just wishes - they're the roadmap for your life's journey.`,
          examples: [
            'Children\'s education fund',
            'Dream home purchase',
            'Retirement security',
            'Family vacation fund',
            'Charitable giving'
          ]
        },
        {
          title: 'Why Dreams Need Protection',
          icon: Shield,
          color: 'bg-blue-500',
          summary: 'Understanding the risks that threaten your dreams',
          details: `Life is unpredictable, and our dreams are vulnerable to unexpected events. Without proper protection, years of planning and saving can be lost in an instant.

Common threats to your dreams include:
• Loss of income due to illness or injury
• Unexpected medical expenses
• Loss of a family breadwinner
• Natural disasters or accidents
• Economic downturns

Protection isn't about fear - it's about ensuring your dreams survive life's challenges.`,
          examples: [
            'Income protection insurance',
            'Health insurance coverage',
            'Life insurance for family',
            'Emergency fund building',
            'Disability coverage'
          ]
        },
        {
          title: 'Building Your Dream Foundation',
          icon: Target,
          color: 'bg-green-500',
          summary: 'Creating a solid base for your aspirations',
          details: `Every dream needs a strong foundation. Building this foundation requires understanding your current situation and creating a plan that grows with you.

Key elements of a strong foundation:
• Clear financial goals and timelines
• Emergency savings for unexpected events
• Insurance protection for major risks
• Regular review and adjustment of plans
• Professional guidance when needed

Remember, the best time to build your foundation is now, not when you need it.`,
          examples: [
            'Goal setting and planning',
            'Emergency fund creation',
            'Insurance portfolio review',
            'Regular financial checkups',
            'Professional consultation'
          ]
        }
      ],
      ui: {
        addDream: 'Add Dream',
        saveDreams: 'Save Dreams',
        myDreams: 'My Dreams',
        buildFoundation: 'Build Foundation',
        nextSection: 'Next Section',
        previousSection: 'Previous Section'
      }
    },
    hi: {
      title: 'अपने सपनों को समझना',
      description: 'जानें कि आपके परिवार के भविष्य के लिए वित्तीय सुरक्षा का क्या मतलब है',
      sections: [
        {
          title: 'आपके सपने क्या हैं?',
          icon: Heart,
          color: 'bg-pink-500',
          summary: 'अपनी गहरी इच्छाओं और लक्ष्यों की पहचान करना',
          details: `सपने हमारे सब कुछ की नींव हैं। वे हमारी आशाओं, इच्छाओं और उस भविष्य का प्रतिनिधित्व करते हैं जो हम अपने लिए और अपने परिवार के लिए बनाना चाहते हैं।

सोचें कि आपके लिए वास्तव में क्या महत्वपूर्ण है:
• आपके बच्चों की शिक्षा और भविष्य
• एक आरामदायक सेवानिवृत्ति
• एक घर जो आश्रयासारखे वाटते
• दूसरों की मदद करने की क्षमता
• वित्तीय स्वतंत्रता और मन की शांति

ये सिर्फ इच्छा नहीं हैं - वे आपके जीवन की यात्रा का रोडमैप हैं।`,
          examples: [
            'बच्चों की शिक्षा फंड',
            'सपनों का घर खरीदना',
            'सेवानिवृत्ति सुरक्षा',
            'परिवार की छुट्टी फंड',
            'दान देने की क्षमता'
          ]
        },
        {
          title: 'सपनों को सुरक्षा की आवश्यकता क्यों है?',
          icon: Shield,
          color: 'bg-blue-500',
          summary: 'उन जोखिमों को समझना जो आपके सपनों को खतरे में डालते हैं',
          details: `जीवन अनिश्चित है, और हमारे सपने अप्रत्याशित घटनाओं के प्रति संवेदनशील हैं। उचित सुरक्षा के बिना, वर्षों की योजना और बचत एक पल में खो सकती है।

आपके सपनों के लिए सामान्य खतरे:
• बीमारी या चोट के कारण आय का नुकसान
• अप्रत्याशित चिकित्सा खर्च
• परिवार के कमाने वाले की मृत्यु
• प्राकृतिक आपदाएं या दुर्घटनाएं
• आर्थिक मंदी

सुरक्षा डर के बारे में नहीं है - यह सुनिश्चित करने के बारे में है कि आपके सपने जीवन की चुनौतियों से बच सकें।`,
          examples: [
            'आय सुरक्षा बीमा',
            'स्वास्थ्य बीमा कव्हरेज',
            'परिवार के लिए जीवन बीमा',
            'आपातकालीन फंड बनाना',
            'विकलांगता कव्हरेज'
          ]
        },
        {
          title: 'अपनी सपनों की नींव बनाना',
          icon: Target,
          color: 'bg-green-500',
          summary: 'अपनी इच्छाओं के लिए एक मजबूत आधार बनाना',
          details: `हर सपने को एक मजबूत नींव की आवश्यकता होती है। इस नींव को बनाने के लिए अपनी वर्तमान स्थिति को समझना और एक योजना बनाना आवश्यक है जो आपके साथ बढ़े।

एक मजबूत नींव के मुख्य तत्व:
• स्पष्ट वित्तीय लक्ष्य और समय सीमा
• अप्रत्याशित घटनाओं के लिए आपातकालीन बचत
• प्रमुख जोखिमों के लिए बीमा सुरक्षा
• योजनाओं की नियमित समीक्षा और समायोजन
• जरूरत पड़ने पर पेशेवर मार्गदर्शन

याद रखें, अपनी नींव बनाने का सबसे अच्छा समय अभी है, न कि जब आपको इसकी आवश्यकता हो।`,
          examples: [
            'लक्ष्य निर्धारण और योजना',
            'आपातकालीन फंड बनाना',
            'बीमा पोर्टफोलियो समीक्षा',
            'नियमित वित्तीय जांच',
            'पेशेवर परामर्श'
          ]
        }
      ],
      ui: {
        addDream: 'सपना जोड़ें',
        saveDreams: 'सपने सहेजें',
        myDreams: 'मेरे सपने',
        buildFoundation: 'नींव बनाएं',
        nextSection: 'अगला खंड',
        previousSection: 'पिछला खंड'
      }
    },
    mr: {
      title: 'तुमचे स्वप्ने समजून घेणे',
      description: 'तुमच्या कुटुंबाच्या भविष्यासाठी आर्थिक सुरक्षा म्हणजे काय हे जाणून घ्या',
      sections: [
        {
          title: 'तुमची स्वप्ने काय आहेत?',
          icon: Heart,
          color: 'bg-pink-500',
          summary: 'तुमच्या खोल इच्छा आणि ध्येयांची ओळख करणे',
          details: `स्वप्ने आपल्या सर्व काहीचा पाया आहेत. ते आपल्या आशा, इच्छा आणि त्याच्या भविष्याचे प्रतिनिधित्व करतात जे आपण स्वतःसाठी आणि आपल्या कुटुंबासाठी तयार करू इच्छितो.

विचार करा की तुमच्यासाठी खरोखर काय महत्वाचे आहे:
• तुमच्या मुलांचे शिक्षण आणि भविष्य
• एक आरामदायक निवृत्ती
• एक घर जे आश्रयासारखे वाटते
• इतरांची मदत करण्याची क्षमता
• आर्थिक स्वातंत्र्य आणि मनाची शांती

हे फक्त इच्छा नाहीत - ते तुमच्या जीवनाच्या प्रवासाचे रोडमॅप आहेत.`,
          examples: [
            'मुलांचे शिक्षण फंड',
            'स्वप्नांचे घर खरेदी',
            'निवृत्ती सुरक्षा',
            'कुटुंब सुट्टी फंड',
            'दान देण्याची क्षमता'
          ]
        },
        {
          title: 'स्वप्नांना सुरक्षेची गरज का आहे?',
          icon: Shield,
          color: 'bg-blue-500',
          summary: 'त्यांच्या धोक्यांना समजून घेणे जे तुमच्या स्वप्नांना धोक्यात आणतात',
          details: `जीवन अनिश्चित आहे, आणि आपली स्वप्ने अनपेक्षित घटनांना संवेदनशील आहेत. योग्य संरक्षणाशिवाय, वर्षांची योजना आणि बचत एका क्षणात गमावली जाऊ शकते.

तुमच्या स्वप्नांसाठी सामान्य धोके:
• आजार किंवा जखमेमुळे उत्पन्नाचे नुकसान
• अनपेक्षित वैद्यकीय खर्च
• कुटुंबाच्या कमावणाऱ्याचे नुकसान
• नैसर्गिक आपत्ती किंवा अपघात
• आर्थिक मंदी

संरक्षण भीतीबद्दल नाही - हे सुनिश्चित करण्याबद्दल आहे की तुमची स्वप्ने जीवनाच्या आव्हानांना टिकून राहतील.`,
          examples: [
            'उत्पन्न संरक्षण विमा',
            'आरोग्य विमा कव्हरेज',
            'कुटुंबासाठी जीवन विमा',
            'आणीबाणी फंड तयार करणे',
            'अपंगत्व कव्हरेज'
          ]
        },
        {
          title: 'तुमच्या स्वप्नांचा पाया तयार करणे',
          icon: Target,
          color: 'bg-green-500',
          summary: 'तुमच्या इच्छांसाठी एक मजबूत पाया तयार करणे',
          details: `प्रत्येक स्वप्नाला एक मजबूत पाया हवा. हा पाया तयार करण्यासाठी तुमच्या सध्याच्या परिस्थितीला समजून घेणे आणि एक योजना तयार करणे आवश्यक आहे जी तुमच्यासोबत वाढते.

एक मजबूत पायाचे मुख्य घटक:
• स्पष्ट आर्थिक ध्येय आणि वेळेची मर्यादा
• अनपेक्षित घटनांसाठी आणीबाणी बचत
• प्रमुख धोक्यांसाठी विमा संरक्षण
• योजनांचे नियमित पुनरावलोकन आणि समायोजन
• गरज पडल्यावर व्यावसायिक मार्गदर्शन

लक्षात ठेवा, तुमचा पाया तयार करण्याचा सर्वोत्तम वेळ आता आहे, जेव्हा तुम्हाला त्याची गरज असेल तेव्हा नाही.`,
          examples: [
            'ध्येय निर्धारण आणि योजना',
            'आणीबाणी फंड तयार करणे',
            'विमा पोर्टफोलिओ पुनरावलोकन',
            'नियमित आर्थिक तपासणी',
            'व्यावसायिक सल्ला'
          ]
        }
      ],
      ui: {
        addDream: 'स्वप्न जोडा',
        saveDreams: 'स्वप्ने जतन करा',
        myDreams: 'माझी स्वप्ने',
        buildFoundation: 'पाया तयार करा',
        nextSection: 'पुढील विभाग',
        previousSection: 'मागील विभाग'
      }
    }
  };

  const currentContent = content[selectedLanguage];
  const currentSectionData = currentContent.sections[currentSection];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setCurrentSection(0);
  };

  const handleNextSection = () => {
    if (currentSection < currentContent.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'en' ? 'en-US' : 
                     selectedLanguage === 'hi' ? 'hi-IN' : 'mr-IN';
    utterance.rate = 0.9;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAddDream = () => {
    if (newDream.trim()) {
      setUserDreams([...userDreams, { id: Date.now(), text: newDream, completed: false }]);
      setNewDream('');
      toast.success(selectedLanguage === 'en' ? 'Dream added successfully!' : 
                   selectedLanguage === 'hi' ? 'सपना सफलतापूर्वक जोड़ा गया!' : 
                   'स्वप्न यशस्वीरित्या जोडले!');
    }
  };

  const handleToggleDream = (dreamId) => {
    setUserDreams(userDreams.map(dream => 
      dream.id === dreamId ? { ...dream, completed: !dream.completed } : dream
    ));
  };

  const handleRemoveDream = (dreamId) => {
    setUserDreams(userDreams.filter(dream => dream.id !== dreamId));
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {currentContent.description}
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {languageOptions.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={handlePreviousSection}
            disabled={currentSection === 0}
            variant="outline"
          >
            {currentContent.ui.previousSection}
          </Button>
          
          <div className="text-sm text-gray-600">
            Section {currentSection + 1} / {currentContent.sections.length}
          </div>
          
          <Button
            onClick={handleNextSection}
            disabled={currentSection === currentContent.sections.length - 1}
            variant="outline"
          >
            {currentContent.ui.nextSection}
          </Button>
        </div>

        {/* Current Section */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-8">
          <div className="flex items-start gap-6">
            <div className={`${currentSectionData.color} p-4 rounded-full text-white`}>
              <currentSectionData.icon className="h-8 w-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentSectionData.title}
                </h3>
                <Button
                  onClick={() => handleSpeak(currentSectionData.summary + '. ' + currentSectionData.details)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isSpeaking ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {currentSectionData.summary}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentSectionData.details}
                </p>
              </div>

              {/* Examples */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">
                  {selectedLanguage === 'en' ? 'Examples' : 
                   selectedLanguage === 'hi' ? 'उदाहरण' : 'उदाहरणे'}
                </h4>
                <ul className="space-y-2">
                  {currentSectionData.examples.map((example, index) => (
                    <li key={index} className="flex items-center gap-2 text-blue-800">
                      <Star className="h-4 w-4 text-blue-500" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dream Builder */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentContent.ui.myDreams}
            </h3>
            <p className="text-gray-600">
              {selectedLanguage === 'en' ? 'Start building your dream foundation' :
               selectedLanguage === 'hi' ? 'अपनी सपनों की नींव बनाना शुरू करें' :
               'तुमच्या स्वप्नांचा पाया बनवणे सुरू करा'}
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={newDream}
              onChange={(e) => setNewDream(e.target.value)}
              placeholder={selectedLanguage === 'en' ? 'Enter your dream...' :
                         selectedLanguage === 'hi' ? 'अपना सपना दर्ज करें...' :
                         'तुमचे स्वप्न टाका...'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleAddDream} className="bg-pink-600 hover:bg-pink-700">
              {currentContent.ui.addDream}
            </Button>
          </div>

          {userDreams.length > 0 && (
            <div className="space-y-3">
              {userDreams.map((dream) => (
                <div key={dream.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={dream.completed}
                    onChange={() => handleToggleDream(dream.id)}
                    className="h-5 w-5 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className={`flex-1 ${dream.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {dream.text}
                  </span>
                  <Button
                    onClick={() => handleRemoveDream(dream.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Navigation Dots */}
        <div className="flex justify-center gap-2">
          {currentContent.sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSection ? 'bg-pink-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamsUnderstanding;

