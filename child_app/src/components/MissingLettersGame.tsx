import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import './MissingLettersGame.css';

interface WordData {
  word: string;
  alphabet: string;
  language: 'english' | 'telugu';
  category: string;
  meaning?: string;
}

const MissingLettersGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'telugu'>('english');
  const [isMuted, setIsMuted] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // English words with complete alphabets (A-Z)
  const englishWords: WordData[] = [
    { word: 'APPLE', alphabet: 'A', language: 'english', category: 'Fruits', meaning: 'A round fruit with red, yellow, or green skin' },
    { word: 'BALL', alphabet: 'B', language: 'english', category: 'Toys', meaning: 'A round object used in games and sports' },
    { word: 'CAT', alphabet: 'C', language: 'english', category: 'Animals', meaning: 'A small furry animal that purrs' },
    { word: 'DOG', alphabet: 'D', language: 'english', category: 'Animals', meaning: 'A friendly animal that barks and wags its tail' },
    { word: 'ELEPHANT', alphabet: 'E', language: 'english', category: 'Animals', meaning: 'A very large gray animal with a long trunk' },
    { word: 'FISH', alphabet: 'F', language: 'english', category: 'Animals', meaning: 'An animal that lives in water and swims' },
    { word: 'GIRL', alphabet: 'G', language: 'english', category: 'People', meaning: 'A young female person' },
    { word: 'HOUSE', alphabet: 'H', language: 'english', category: 'Places', meaning: 'A building where people live' },
    { word: 'ICE', alphabet: 'I', language: 'english', category: 'Nature', meaning: 'Frozen water, very cold and hard' },
    { word: 'JUICE', alphabet: 'J', language: 'english', category: 'Drinks', meaning: 'A sweet liquid made from fruits' },
    { word: 'KITE', alphabet: 'K', language: 'english', category: 'Toys', meaning: 'A light object that flies in the wind' },
    { word: 'LION', alphabet: 'L', language: 'english', category: 'Animals', meaning: 'A big cat with a mane, king of the jungle' },
    { word: 'MOON', alphabet: 'M', language: 'english', category: 'Space', meaning: 'The bright object in the night sky' },
    { word: 'NEST', alphabet: 'N', language: 'english', category: 'Nature', meaning: 'A home that birds build for their eggs' },
    { word: 'ORANGE', alphabet: 'O', language: 'english', category: 'Fruits', meaning: 'A round orange fruit with thick skin' },
    { word: 'PENCIL', alphabet: 'P', language: 'english', category: 'School', meaning: 'A tool used for writing and drawing' },
    { word: 'QUEEN', alphabet: 'Q', language: 'english', category: 'People', meaning: 'A female ruler of a country' },
    { word: 'RABBIT', alphabet: 'R', language: 'english', category: 'Animals', meaning: 'A small animal with long ears that hops' },
    { word: 'SUN', alphabet: 'S', language: 'english', category: 'Space', meaning: 'The bright star that gives us light and heat' },
    { word: 'TREE', alphabet: 'T', language: 'english', category: 'Nature', meaning: 'A tall plant with leaves and branches' },
    { word: 'UMBRELLA', alphabet: 'U', language: 'english', category: 'Objects', meaning: 'A tool used to stay dry in the rain' },
    { word: 'VAN', alphabet: 'V', language: 'english', category: 'Vehicles', meaning: 'A large vehicle for carrying people or things' },
    { word: 'WATER', alphabet: 'W', language: 'english', category: 'Nature', meaning: 'A clear liquid that we drink and swim in' },
    { word: 'BOX', alphabet: 'X', language: 'english', category: 'Objects', meaning: 'A container with six sides' },
    { word: 'YELLOW', alphabet: 'Y', language: 'english', category: 'Colors', meaning: 'A bright color like the sun' },
    { word: 'ZEBRA', alphabet: 'Z', language: 'english', category: 'Animals', meaning: 'A horse-like animal with black and white stripes' }
  ];

  // Telugu words with complete alphabets (from aa to bandeera)
  const teluguWords: WordData[] = [
    { word: 'అమ్మ', alphabet: 'అ', language: 'telugu', category: 'వ్యక్తులు', meaning: 'Mother - తల్లి (amma) - The female parent who takes care of children' },
    { word: 'ఆవు', alphabet: 'ఆ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Cow - ఆవు (aavu) - A domestic animal that gives milk' },
    { word: 'ఇల్లు', alphabet: 'ఇ', language: 'telugu', category: 'ప్రదేశాలు', meaning: 'House - ఇల్లు (illu) - A building where people live' },
    { word: 'ఈగ', alphabet: 'ఈ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Fly - ఈగ (eega) - A small flying insect' },
    { word: 'ఉడుత', alphabet: 'ఉ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Squirrel - ఉడుత (uduta) - A small animal that climbs trees' },
    { word: 'ఊరు', alphabet: 'ఊ', language: 'telugu', category: 'ప్రదేశాలు', meaning: 'Village - ఊరు (ooru) - A small community of people' },
    { word: 'ఋషి', alphabet: 'ఋ', language: 'telugu', category: 'వ్యక్తులు', meaning: 'Sage - ఋషి (rishi) - A wise and holy person' },
    { word: 'ఎలుక', alphabet: 'ఎ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Mouse - ఎలుక (eluka) - A small rodent animal' },
    { word: 'ఏనుగు', alphabet: 'ఏ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Elephant - ఏనుగు (eenugu) - A very large gray animal with a trunk' },
    { word: 'ఐదు', alphabet: 'ఐ', language: 'telugu', category: 'సంఖ్యలు', meaning: 'Five - ఐదు (aidu) - The number 5' },
    { word: 'ఒంటె', alphabet: 'ఒ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Camel - ఒంటె (onte) - A desert animal with humps' },
    { word: 'ఓడ', alphabet: 'ఓ', language: 'telugu', category: 'వాహనాలు', meaning: 'Ship - ఓడ (oda) - A large boat that travels on water' },
    { word: 'ఔషధం', alphabet: 'ఔ', language: 'telugu', category: 'వస్తువులు', meaning: 'Medicine - ఔషధం (aushadham) - A substance used to treat illness' },
    { word: 'అం', alphabet: 'అం', language: 'telugu', category: 'అక్షరాలు', meaning: 'Anusvara - అనుస్వారం (am) - A nasal sound in Telugu' },
    { word: 'అః', alphabet: 'అః', language: 'telugu', category: 'అక్షరాలు', meaning: 'Visarga - విసర్గ (ah) - A breathing sound in Telugu' },
    { word: 'కుక్క', alphabet: 'క', language: 'telugu', category: 'ప్రాణులు', meaning: 'Dog - కుక్క (kukka) - A friendly animal that barks' },
    { word: 'ఖడ్గం', alphabet: 'ఖ', language: 'telugu', category: 'ఆయుధాలు', meaning: 'Sword - ఖడ్గం (khadgam) - A sharp weapon for fighting' },
    { word: 'గుర్రం', alphabet: 'గ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Horse - గుర్రం (gurram) - A fast animal that people ride' },
    { word: 'ఘంట', alphabet: 'ఘ', language: 'telugu', category: 'వస్తువులు', meaning: 'Bell - ఘంట (ghanta) - A metal object that makes sound when hit' },
    { word: 'ఙాణం', alphabet: 'ఙ', language: 'telugu', category: 'వస్తువులు', meaning: 'Bell - ఙాణం (nganam) - Another word for bell in Telugu' },
    { word: 'చిట్టి', alphabet: 'చ', language: 'telugu', category: 'ప్రాణులు', meaning: 'Bird - చిట్టి (chitti) - A flying animal with feathers' },
    { word: 'ఛత్రం', alphabet: 'ఛ', language: 'telugu', category: 'వస్తువులు', meaning: 'Umbrella - ఛత్రం (chatram) - A tool to stay dry in rain' },
    { word: 'జెండా', alphabet: 'జ', language: 'telugu', category: 'వస్తువులు', meaning: 'Flag - జెండా (jenda) - A colored cloth that represents a country' },
    { word: 'ఝరి', alphabet: 'ఝ', language: 'telugu', category: 'ప్రకృతి', meaning: 'Waterfall - ఝరి (jhari) - Water falling from a high place' },
    { word: 'టమాట', alphabet: 'ట', language: 'telugu', category: 'కూరగాయలు', meaning: 'Tomato - టమాట (tamata) - A red vegetable used in cooking' },
    { word: 'ఠాకు', alphabet: 'ఠ', language: 'telugu', category: 'వస్తువులు', meaning: 'Box - ఠాకు (thaku) - A container to store things' },
    { word: 'డబ్బు', alphabet: 'డ', language: 'telugu', category: 'వస్తువులు', meaning: 'Money - డబ్బు (dabbu) - Paper or coins used to buy things' },
    { word: 'ఢక్కా', alphabet: 'ఢ', language: 'telugu', category: 'వస్తువులు', meaning: 'Drum - ఢక్కా (dhakka) - A musical instrument you hit with sticks' },
    { word: 'ణాణం', alphabet: 'ణ', language: 'telugu', category: 'వస్తువులు', meaning: 'Bell - ణాణం (nanam) - A metal object that rings' },
    { word: 'తల', alphabet: 'త', language: 'telugu', category: 'శరీర భాగాలు', meaning: 'Head - తల (tala) - The top part of your body' },
    { word: 'థలం', alphabet: 'థ', language: 'telugu', category: 'ప్రదేశాలు', meaning: 'Place - థలం (thalam) - A location or area' },
    { word: 'దీపం', alphabet: 'ద', language: 'telugu', category: 'వస్తువులు', meaning: 'Lamp - దీపం (deepam) - A light that gives brightness' },
    { word: 'ధనం', alphabet: 'ధ', language: 'telugu', category: 'వస్తువులు', meaning: 'Wealth - ధనం (dhanam) - Money and valuable things' },
    { word: 'నీరు', alphabet: 'న', language: 'telugu', category: 'ప్రకృతి', meaning: 'Water - నీరు (neeru) - A clear liquid that we drink' },
    { word: 'పిల్లి', alphabet: 'ప', language: 'telugu', category: 'ప్రాణులు', meaning: 'Cat - పిల్లి (pilli) - A small furry animal that purrs' },
    { word: 'ఫలం', alphabet: 'ఫ', language: 'telugu', category: 'పండ్లు', meaning: 'Fruit - ఫలం (phalam) - Sweet food that grows on trees' },
    { word: 'బంతి', alphabet: 'బ', language: 'telugu', category: 'ఆటలు', meaning: 'Ball - బంతి (banti) - A round object used in games' },
    { word: 'భారం', alphabet: 'భ', language: 'telugu', category: 'వస్తువులు', meaning: 'Weight - భారం (bharam) - How heavy something is' },
    { word: 'మంచు', alphabet: 'మ', language: 'telugu', category: 'ప్రకృతి', meaning: 'Ice - మంచు (manchu) - Frozen water, very cold' },
    { word: 'యాత్ర', alphabet: 'య', language: 'telugu', category: 'కార్యకలాపాలు', meaning: 'Journey - యాత్ర (yaatra) - A trip or travel to a place' },
    { word: 'రాజు', alphabet: 'ర', language: 'telugu', category: 'వ్యక్తులు', meaning: 'King - రాజు (raaju) - A male ruler of a country' },
    { word: 'లేడి', alphabet: 'ల', language: 'telugu', category: 'ప్రాణులు', meaning: 'Deer - లేడి (laedi) - A beautiful animal with antlers' },
    { word: 'వ్యాన్', alphabet: 'వ', language: 'telugu', category: 'వాహనాలు', meaning: 'Van - వ్యాన్ (vyaan) - A large vehicle for carrying people' },
    { word: 'శివుడు', alphabet: 'శ', language: 'telugu', category: 'దేవతలు', meaning: 'Lord Shiva - శివుడు (shivudu) - A Hindu god' },
    { word: 'షడ్జం', alphabet: 'ష', language: 'telugu', category: 'సంగీతం', meaning: 'Musical note - షడ్జం (shadjam) - A sound in music' },
    { word: 'సింహం', alphabet: 'స', language: 'telugu', category: 'ప్రాణులు', meaning: 'Lion - సింహం (simham) - The king of the jungle' },
    { word: 'హంస', alphabet: 'హ', language: 'telugu', category: 'పక్షులు', meaning: 'Swan - హంస (hamsa) - A beautiful white bird' },
    { word: 'క్షత్రం', alphabet: 'క్ష', language: 'telugu', category: 'ప్రదేశాలు', meaning: 'Kingdom - క్షత్రం (kshatram) - A country ruled by a king' },
    { word: 'బండీర', alphabet: 'బం', language: 'telugu', category: 'వస్తువులు', meaning: 'Bandeera - బండీర (bandeera) - A type of container or vessel' }
  ];

  // Get current word list based on selected language
  const getCurrentWordList = () => {
    return currentLanguage === 'english' ? englishWords : teluguWords;
  };

  const currentWordList = getCurrentWordList();
  const currentWord = currentWordList[currentWordIndex];

  // Create word display with highlighted alphabet
  const getWordDisplay = () => {
    const word = currentWord.word;
    const alphabet = currentWord.alphabet;
    
    // For Telugu words, we need to handle otthulu and conjuncts properly
    if (currentWord.language === 'telugu') {
      // Improved Telugu character splitting that handles otthulu correctly
      const characters = [];
      let i = 0;
      
      while (i < word.length) {
        let char = word[i];
        
        // Check for Telugu otthulu (vowel marks) and special characters
        if (i < word.length - 1) {
          const nextChar = word[i + 1];
          
          // Handle all Telugu vowel marks (otthulu)
          if (nextChar === '్' || nextChar === 'ా' || nextChar === 'ి' || nextChar === 'ీ' || 
              nextChar === 'ు' || nextChar === 'ూ' || nextChar === 'ె' || nextChar === 'ే' || 
              nextChar === 'ై' || nextChar === 'ొ' || nextChar === 'ో' || nextChar === 'ౌ' ||
              nextChar === 'ం' || nextChar === 'ః') {
            char += nextChar;
            i++;
          }
          
          // Handle specific Telugu conjuncts that need special treatment
          if (i < word.length - 1) {
            // Handle క్ష (ksha) - special conjunct
            if (char === 'క' && nextChar === '్ష') {
              char += nextChar;
              i++;
            }
            // Handle బం (bam) - special conjunct
            else if (char === 'బ' && nextChar === 'ం') {
              char += nextChar;
              i++;
            }
            // Handle other potential conjuncts
            else if (i < word.length - 2) {
              const thirdChar = word[i + 2];
              // Check for three-character combinations
              if ((char === 'క' && nextChar === '్ష' && thirdChar === 'ా') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ి') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ీ') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ు') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ూ') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ె') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ే') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ై') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ొ') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ో') ||
                  (char === 'క' && nextChar === '్ష' && thirdChar === 'ౌ')) {
                char += nextChar + thirdChar;
                i += 2;
              }
            }
          }
        }
        
        characters.push(char);
        i++;
      }
      
      return characters.map((char, index) => {
        // Determine if this character should be highlighted
        const isHighlighted = char.startsWith(alphabet) || 
                             (alphabet.length > 1 && char.includes(alphabet)) ||
                             (index === 0 && char.startsWith(alphabet.charAt(0)));
        
        return (
          <span 
            key={index} 
            className={isHighlighted ? "highlighted-letter" : "letter"}
            title={isHighlighted ? `Starting alphabet: ${alphabet}` : char}
            style={{ 
              display: 'inline-block',
              margin: '0 0.1rem',
              fontFamily: "'Noto Sans Telugu', 'Gidugu', 'Lakki Reddy', 'Telugu Sangam MN', 'Arial Unicode MS', sans-serif",
              fontSize: '2rem',
              fontWeight: isHighlighted ? '900' : '700',
              color: isHighlighted ? '#f39c12' : '#2c3e50',
              lineHeight: '1.2',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            {char}
          </span>
        );
      });
    } else {
      // For English words, simple character-by-character highlighting
      return word.split('').map((letter, index) => {
        const isHighlighted = letter.toUpperCase() === alphabet.toUpperCase() || 
                             (word.startsWith(alphabet) && index === 0);
        
        return (
          <span 
            key={index} 
            className={isHighlighted ? "highlighted-letter" : "letter"}
            title={isHighlighted ? `Starting alphabet: ${alphabet}` : letter}
          >
            {letter}
          </span>
        );
      });
    }
  };

  // Play alphabet sound (English only)
  const playAlphabetSound = () => {
    if (currentWord.language === 'english' && !isMuted) {
      if (audioRef.current) {
        // Simple beep sound for alphabet
        audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Handle next word
  const handleNext = () => {
    setShowMeaning(false);
    
    if (currentWordIndex < currentWordList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game completed
      setGameStarted(false);
      setCurrentWordIndex(0);
    }
  };

  // Handle previous word
  const handlePrevious = () => {
    setShowMeaning(false);
    
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  // Toggle mute (affects English words only)
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle meaning display
  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
  };

  // Reset game
  const resetGame = () => {
    setCurrentWordIndex(0);
    setShowMeaning(false);
  };

  // Handle language change
  const handleLanguageChange = (language: 'english' | 'telugu') => {
    setCurrentLanguage(language);
    setCurrentWordIndex(0);
    setShowMeaning(false);
  };

  // Get Telugu alphabet information for better understanding
  const getTeluguAlphabetInfo = (alphabet: string) => {
    const alphabetInfo: { [key: string]: string } = {
      'అ': 'Vowel - అచ్చు (a)',
      'ఆ': 'Vowel - అచ్చు (aa)',
      'ఇ': 'Vowel - అచ్చు (i)',
      'ఈ': 'Vowel - అచ్చు (ii)',
      'ఉ': 'Vowel - అచ్చు (u)',
      'ఊ': 'Vowel - అచ్చు (uu)',
      'ఋ': 'Vowel - అచ్చు (ru)',
      'ఎ': 'Vowel - అచ్చు (e)',
      'ఏ': 'Vowel - అచ్చు (ee)',
      'ఐ': 'Vowel - అచ్చు (ai)',
      'ఒ': 'Vowel - అచ్చు (o)',
      'ఓ': 'Vowel - అచ్చు (oo)',
      'ఔ': 'Vowel - అచ్చు (au)',
      'అం': 'Anusvara - అనుస్వారం (am)',
      'అః': 'Visarga - విసర్గ (ah)',
      'క': 'Consonant - హల్లు (ka)',
      'ఖ': 'Consonant - హల్లు (kha)',
      'గ': 'Consonant - హల్లు (ga)',
      'ఘ': 'Consonant - హల్లు (gha)',
      'ఙ': 'Consonant - హల్లు (nga)',
      'చ': 'Consonant - హల్లు (cha)',
      'ఛ': 'Consonant - హల్లు (chha)',
      'జ': 'Consonant - హల్లు (ja)',
      'ఝ': 'Consonant - హల్లు (jha)',
      'ట': 'Consonant - హల్లు (ta)',
      'ఠ': 'Consonant - హల్లు (tha)',
      'డ': 'Consonant - హల్లు (da)',
      'ఢ': 'Consonant - హల్లు (dha)',
      'ణ': 'Consonant - హల్లు (na)',
      'త': 'Consonant - హల్లు (ta)',
      'థ': 'Consonant - హల్లు (tha)',
      'ద': 'Consonant - హల్లు (da)',
      'ధ': 'Consonant - హల్లు (dha)',
      'న': 'Consonant - హల్లు (na)',
      'ప': 'Consonant - హల్లు (pa)',
      'ఫ': 'Consonant - హల్లు (pha)',
      'బ': 'Consonant - హల్లు (ba)',
      'భ': 'Consonant - హల్లు (bha)',
      'మ': 'Consonant - హల్లు (ma)',
      'య': 'Consonant - హల్లు (ya)',
      'ర': 'Consonant - హల్లు (ra)',
      'ల': 'Consonant - హల్లు (la)',
      'వ': 'Consonant - హల్లు (va)',
      'శ': 'Consonant - హల్లు (sha)',
      'ష': 'Consonant - హల్లు (sha)',
      'స': 'Consonant - హల్లు (sa)',
      'హ': 'Consonant - హల్లు (ha)',
      'క్ష': 'Conjunct - సంయుక్తాక్షరం (ksha)',
      'బం': 'Conjunct - సంయుక్తాక్షరం (bam)'
    };
    
    return alphabetInfo[alphabet] || `Telugu Alphabet: ${alphabet}`;
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-header">
          <Link to="/" className="back-btn">
            <ArrowLeft size={24} />
            Back to Home
          </Link>
          <h1>🔤 Words Learning Game 🔤</h1>
        </div>
        
        <div className="game-instructions">
          <h3>🎯 Learn English & Telugu Alphabets!</h3>
          <p>Explore complete words for each alphabet in both languages!</p>
          <div className="language-info">
            <div className="lang-item">
              <span>🇺🇸 English</span>
              <span>✅ Voice Enabled</span>
              <span>26 English Words (A-Z)</span>
            </div>
            <div className="lang-item">
              <span>🇮🇳 Telugu</span>
              <span>🔇 Voice Disabled</span>
              <span>45 Telugu Words (అ to బండీర)</span>
            </div>
          </div>
          <ul>
            <li>Choose between English and Telugu</li>
            <li>English: Learn A-Z with voice sounds</li>
            <li>Telugu: Learn Telugu alphabets without voice</li>
            <li>See complete words with highlighted alphabets</li>
            <li>Learn meanings and categories</li>
            <li>Have fun while learning!</li>
          </ul>
        </div>

        <button className="btn start-btn" onClick={() => setGameStarted(true)}>
          🚀 Start Learning! 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={24} />
          Back to Home
        </Link>
        <h1>🔤 Words Learning Game 🔤</h1>
      </div>

      <div className="game-controls">
        <div className="control-section">
          <button 
            className={`lang-btn ${currentLanguage === 'english' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('english')}
          >
            🇺🇸 English (A-Z)
          </button>
          <button 
            className={`lang-btn ${currentLanguage === 'telugu' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('telugu')}
          >
            🇮🇳 Telugu (అ to బండీర)
          </button>
        </div>
        
        <div className="control-section">
          <button 
            className={`mute-btn ${isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            disabled={currentLanguage === 'telugu'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {currentLanguage === 'telugu' ? 'Voice Disabled' : (isMuted ? 'Unmuted' : 'Muted')}
          </button>
          <button className="reset-btn" onClick={resetGame}>
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <span>Progress:</span>
          <span>{currentWordIndex + 1} / {currentWordList.length}</span>
        </div>
        <div className="stat-item">
          <span>Language:</span>
          <span>{currentLanguage === 'english' ? '🇺🇸 English (A-Z)' : '🇮🇳 Telugu (అ to బండీర)'}</span>
        </div>
        <div className="stat-item">
          <span>Voice:</span>
          <span>{currentLanguage === 'english' ? (isMuted ? '🔇 Muted' : '🔊 Enabled') : '🔇 Disabled'}</span>
        </div>
        <div className="stat-item">
          <span>Category:</span>
          <span>{currentWord.category}</span>
        </div>
      </div>

      <div className="word-display">
        <div className="alphabet-display">
          <div className="alphabet-letter">
            {currentWord.alphabet}
          </div>
          <div className="alphabet-info">
            <span>Alphabet</span>
            <span className="alphabet-name">
              {currentLanguage === 'english' ? 
                `Letter ${currentWord.alphabet}` : 
                getTeluguAlphabetInfo(currentWord.alphabet)
              }
            </span>
          </div>
        </div>
        
        <div className="word-section">
          <div className="word-category">
            {currentWord.category}
          </div>
          <div className="word-letters">
            {getWordDisplay()}
          </div>
          <div className="word-actions">
            <button className="meaning-btn" onClick={toggleMeaning}>
              {showMeaning ? '🔒 Hide Meaning' : '📖 Show Meaning'}
            </button>
            {currentWord.language === 'english' && (
              <button className="sound-btn" onClick={playAlphabetSound}>
                🔊 Say Alphabet
              </button>
            )}
          </div>
        </div>

        {showMeaning && (
          <div className="meaning-section">
            <h4>📚 Word Meaning:</h4>
            <p>{currentWord.meaning}</p>
          </div>
        )}
      </div>

      <div className="navigation-controls">
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrevious}
          disabled={currentWordIndex === 0}
        >
          ⬅️ Previous
        </button>
        
        <button className="nav-btn next-btn" onClick={handleNext}>
          {currentWordIndex < currentWordList.length - 1 ? 'Next ➡️' : 'Finish 🎉'}
        </button>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default MissingLettersGame;
