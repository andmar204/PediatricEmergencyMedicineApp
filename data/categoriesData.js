import Category from '../models/category';
import CatContent from '../models/catContent';

//color codes taken from https://www.w3schools.com/cssref/css_colors.asp

export const CATEGORIES = [
    new Category('c1', 'Medical', '#ffc0cb'),
    new Category('c2', 'Surgical', '#f54242'),
    new Category('c3', 'Trauma ', '#ffa500'),
    new Category('c4', 'Toxicology', '#d08b49'),
    new Category('c5', 'Foreign Ingestion', '#368dff'),
    new Category('c6', 'Emergent Rashes', '#41d95d'),
    new Category('c7', 'Search', '#9eecff'),
    new Category('c8', 'Chatroom', '#b9ffb0')
  ];

  export const CONTENT = [
    new CatContent('c4-1',
     [
      'ACUTE INGESTION:',
      'Doses requiring intervention: Adults and children &gt; 6 years, at least 10 g or 200 mg/kg (whichever is less),',
      'within an 8-hour period. For children &lt; 6 years, 200 mg/kg or more within a 8-hour period.',
      'REPEATED SUPRATHERAPEUTIC INGESTION (RSTI):',
      'Doses requiring intervention: Adults and children &gt; 6 years, at least 10 g or 200 mg/kg, whichever is less,',
      'in a single 24-hour period, or 6 g or 150 mg/kg, whichever is less, per 24-hour period for 48 hours or longer. For',
      'children &lt; 6 years, 200 mg/kg or more over a single 24-hour period, or 150 mg/kg or more per 24 hours for the past',
      '48 hours, or 100 mg/kg or more per 24 hours for 72 hours or more.'
     ],
      [
        'SIGNS/SYMPTOMS',

          'Since ingestion:',
          '&lt; 24hrs – Asymptomatic or anorexia, nausea, vomiting, malaise, pallor, diaphoresis',
          '1 – 3 days – Right upper quadrant pain, hepatomegaly, oliguria, elevated liver function tests/INR',
          '3 – 4 days – Return of anorexia, nausea, vomiting, malaise; signs of hepatic failure; renal failure, cardiomyopathy',
          '4 – 14 days – Recovery; non-cardiogenic pulmonary edema'
      ],
       'managemnetInfo',
        'medicationInfo',
        'referencesInfo'),

    new CatContent('c1-2', 'evaluationInfo', 'SignsInfo', 'managemnetInfo', 'medicationInfo','referencesInfo')
    
  ];

  export const SUBCATEGORIES = [
      
    //MEdical
    new Category('c1-1', 'Status asthmaticus','#ffc6d0','c1'),
    new Category('c1-2', 'Status epilepticus','#ffc6d0','c1'),
    new Category('c1-3', 'Sepsis','#ffcdd5','c1'),
    new Category('c1-4', 'Sickle cell and fever','#ffcdd5','c1'),
    new Category('c1-5', 'Pneumonia','#ffd3db','c1'),
    new Category('c1-6', 'Pyelonephritis','#ffd3db','c1'),
    new Category('c1-7', 'Fever in immunosuppressed','#ffd9e0','c1'),
    new Category('c1-8', 'Fever < or = 28 days','#ffd9e0','c1'),
    new Category('c1-9', 'Fever <  or = 60 days','#ffe0e5','c1'),
    new Category('c1-10', 'Orbital cellultis','#ffe0e5','c1'),
    new Category('c1-11', 'Pelvic Inflammatory disease','#ffe3e8','c1'),
    new Category('c1-12', 'Ectopic pregnancy','#ffe3e8','c1'),
    new Category('c1-13', 'Meningitis ','#ffe6ea','c1'),
    new Category('c1-14', 'Altered mental status','#ffe6ea','c1'),
    new Category('c1-15', 'Retropharyngeal abscess','#ffe6ea','c1'),
    new Category('c1-16', 'Peritonsillar abscess','#ffe6ea','c1'),
    new Category('c1-17', 'Hypertensive crisis','#ffecef','c1'),
    new Category('c1-18', 'Thyroid storm','#ffecef','c1'),
    new Category('c1-19', 'DKA','#fff2f5','c1'),
    new Category('c1-20', 'Anaphylaxis','#fff2f5','c1'),
    new Category('c1-21', 'Bacterial tracheitis','#fff2f5','c1'),
    new Category('c1-22', 'Croup','#fff2f5','c1'),
    new Category('c1-23', 'BRUE','#fff2f5','c1'),
    //Surgial
    new Category('c2-1', 'Appendicitis', '#ff0d0d','c2'),
    new Category('c2-2', 'Testicular Torsion', '#ff0d0d','c2'),
    new Category('c2-3', 'Ovarian Torsion', '#ff2626','c2'),
    new Category('c2-4', 'Pyloric stenosis', '#ff2626','c2'),
    new Category('c2-5', 'Midgut volvulus', '#ff4040','c2'),
    new Category('c2-6', 'Intracranial bleed', '#ff4040','c2'),
    new Category('c2-7', 'Globe rupture', '#ff5959','c2'),
    new Category('c2-8', 'Hyphema', '#ff5959','c2'),
    new Category('c2-9', 'Nasal septal hematoma', '#ff7373','c2'),
    new Category('c2-10', 'Surgical airway', '#ff7373','c2'),
    new Category('c2-11', 'Necrotizing enterocolitis', '#ff8c8c','c2'),
    new Category('c2-12', 'Peritonitis', '#ff8c8c','c2'),
    new Category('c2-13', 'Perianal abscess', '#ffa6a6','c2'),
    new Category('c2-14', 'Acute cholecystitis', '#ffa6a6','c2'),
    new Category('c2-15', 'Intussusception', '#ffa6a6','c2'),
    
    //trauma
    new Category('c3-1', 'SPINE ', '#ffae19','c3'),
    new Category('c3-2', 'HEAD  ', '#ffae19','c3'),
    new Category('c3-3', 'MVC ', '#ffbc40','c3'),
    new Category('c3-4', 'PEDESTRIAN HBC ', '#ffbc40','c3'),
    new Category('c3-5', 'BLUNT THORACIC ', '#ffc966','c3'),
    new Category('c3-6', 'BLUNT ABDOMINAL ', '#ffc966','c3'),
    new Category('c3-7', 'GSW EXTREMITY ', '#ffd68c','c3'),
    new Category('c3-8', 'TENSION PNEUMOTHORAX ', '#ffd68c','c3'),
    new Category('c3-9', 'CARDIAC TAMPONADE ', '#ffd68c','c3'),
        
    //TOxicology
    new Category('c4-1', 'ACETAMINOPHEN', '#d08b49','c4'),
    new Category('c4-2', 'IRON', '#d08b49','c4'),
    new Category('c4-3', 'SALICYLATE', '#d4975c','c4'),
    new Category('c4-4', 'TRICYCLIC ANTIDEPRESSANTS', '#d4975c','c4'),
    new Category('c4-5', 'CLONIDINE', '#daa46f','c4'),
    new Category('c4-6', 'ORGANOPHOSPHATE', '#daa46f','c4'),
    new Category('c4-7', 'CARBON MONOXIDE', '#deb082','c4'),
    new Category('c4-8', 'CYANIDE', '#deb082','c4'),
    new Category('c4-9', 'OPIOIDS', '#e4bc95','c4'),
    new Category('c4-10', 'BENZODIAZEPINES', '#e4bc95','c4'),
    new Category('c4-11', 'ECSTASY', '#e4bc95','c4'),
    new Category('c4-12', 'BATH SALTS', '#e8c8a9','c4'),
    new Category('c4-13', 'COCAINE', '#e8c8a9','c4'),
    new Category('c4-14', 'LSD', '#ebceb2','c4'),
    new Category('c4-15', 'MARIJUANA', '#ebceb2','c4'),
    new Category('c4-16', 'ALCOHOLS', '#ebceb2','c4'),
    /*
    //
    new Category('c5', 'Foreign Ingestion', '#368dff'),
    new Category('c6', 'Emergent Rashes', '#41d95d'),
    new Category('c7', 'Search', '#9eecff'),
    new Category('c8', 'Chatroom', '#b9ffb0')
    //some content from Udemy.com
    */
  ];

  