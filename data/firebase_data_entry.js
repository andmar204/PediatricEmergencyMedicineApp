/*
Always keep this file commented. This file has two snippets
of code. One to add all the dummy data for all the categories, 
another to add data to one specific category. The way these
work is that you simply copy and paste them into any button's 
onPress method (I personally prefer to use the login button's
onPress) and then click the button. That way, the button will
run the code and add whatever it is you like to Firestore.
*/

/*SNIPPET 1

SUBCATEGORIES.map(cat => firebase.firestore().collection('data').doc(cat.id).set({
  catId: cat.id,
  evaluation: cat.title + '_evaluation',
  management: cat.title + '_management',
  medications: cat.title + '_medications',
  symptoms: cat.title + '_symptoms',
  references: cat.title + '_references',
}))
*/

/*
keep this file always commented
this file is just to enter data manually to the firebase database by
using the following method and following html and JavaScript formats
use method on the login page on Onpress login button
this is an example of how data was entered for the acetaminophen category
*/

/*SNIPPET 2

SUBCATEGORIES.map(cat => {
    if (cat.id === 'c4-1') {
      firebase.firestore().collection('data').doc(cat.id).set({
        catId: cat.id,
        evaluation: 'What acute ingestions are potentially toxic?' + '\n' +
        'Potentially toxic doses: &gt; 7.5g in adult or &gt; 150mg/kg in children (Single acute ingestions of &lt; 200mg/kg in children' +
        '&lt; 6 years are unlikely to result in toxicity).'+ '\n' +
        'What known ingestions require intervention? *' + '\n' +
        'ACUTE INGESTION:' + '\n' +
        'Doses requiring intervention: Adults and children &gt; 6 years, at least 10 g or 200 mg/kg (whichever is less),' +
        'within an 8-hour period. For children &lt; 6 years, 200 mg/kg or more within a 8-hour period.' + '\n' +
        'REPEATED SUPRATHERAPEUTIC INGESTION (RSTI):' + '\n' +
        'Doses requiring intervention: Adults and children &gt; 6 years, at least 10 g or 200 mg/kg, whichever is less,'+
        'in a single 24-hour period, or 6 g or 150 mg/kg, whichever is less, per 24-hour period for 48 hours or longer. For'+
        'children &lt; 6 years, 200 mg/kg or more over a single 24-hour period, or 150 mg/kg or more per 24 hours for the past'+
        '48 hours, or 100 mg/kg or more per 24 hours for 72 hours or more.' + '\n' +
        'HIGHER RISK PATIENTS (eg, pregnancy, chroninc alcoholism, prolonged fasting, chronic isoniazid use):' + '\n' +
        'Doses requiring intervention: More than 4 g or greater than 100 mg/kg in 24 hours, whichever is less.'+
        'Consult your regional Poison Control Center for guidance managing these patients.'+ '\n' +
       
        '*THE QUANTITY OF DRUG INGESTED IN OVERDOSES IS OFTEN UNRELIABLE, AND THEREFORE' +
        'ACETAMINOPHEN LEVELS SHOULD BE CHECKED IN MOST CASES – SEE MANAGEMENT SECTION.',
        management: 'TIME SINCE INGESTION:'+ '\n' +
        'Within 4 hours:'+ '\n' +
        '- Consider activated charcoal (1mg/kg, max 50 g), in cooperative patients. Not recommended'+ '\n' +
        'for accidental ingestions in children &lt; 6 years.'+ '\n' +
        '- Obtain a 4-hour serum acetaminophen level and plot on the Rumack-Matthew nomogram to' +
        'determine risk.'+ '\n' +
        '- If the 4-hour acetaminophen level is above the treatment line, send AST, ALT, INR, and' +
        'metabolic panel and begin N-acetylcysteine (NAC).'+
        '- NAC is most effective if started within 8 hours of ingestion. If for some reason your'+
        'acetaminophen level will be delayed, be sure to initiate NAC within 8 hours of ingestion.' + '\n' + 
        '\n' +
        '4 – 8 hours:'+ '\n' +
        '- Obtain a serum acetaminophen level and plot on the Rumack-Matthew nomogram to'+
        'determine risk.'+ '\n' +
        '- If the acetaminophen level will be back in time to allow for the initiation of NAC within 8' +
        'hours of ingestion, if indicated per the nomogram, wait for the level. If not, send AST, ALT,'+
        'INR, and metabolic panel and begin NAC empirically. If the acetaminophen level is' +
        'subsequently found to be below the treatment line on the nomogram, NAC can be stopped.' + '\n' +
         '\n' +
        '8 – 24 hours:'+ '\n' +
        '- Obtain serum acetaminophen level, LFTs, INR and metabolic panel, and initiate NAC '+
        'immediately, do not wait for the level.'+ '\n' +
        '- If the acetaminophen level is subsequently found to be below the treatment line on the'+
        'nomogram, the NAC can then be stopped.'+ '\n' +
        '\n' +
        '&gt; 24 hours:'+ '\n' +
        '- Follow the RSTI management guidelines below and consult your regional Poison Control'+ 
        'Center.'+ '\n' +
        'Unknown:'+ '\n' +
        '- Follow the &gt;8 – 24 hours guideline above and consult your regional Poison Control Center.'+ '\n' +
         '\n' +
        'RSTI (Repeated Supratherapeutic Ingestions):'+ '\n' +
         '\n' +
        '- Obtain serum acetaminophen level and AST, ALT.'+ '\n' +
        '- If acetaminophen level is &lt; 10 (µg/mL), and both AST and ALT are within normal range, no' +
        'treatment is needed.'+ '\n' +
        '- If either the acetaminophen level is &gt; 10 (µg/mL) or the AST and/or ALT are elevated and' +
        'not attributable to another cause, start NAC and consult your regional Poison Control Center.'+ '\n',
        medications: 'Activated Charcoal' + '\n' + '\n' +
        '1 mg/kg (max 50 gm) PO x 1' + '\n' + '\n' +
        'N-acetylcysteine (NAC)*'+ '\n' +
        'PO/NG route (adults and children):'+ '\n' +
        '140 mg/kg x 1, then 4 hours later, 70 mg/kg q 4 hours x 17 doses. Repeat dose if vomited
        'within 1 hour.'+ '\n' + '\n' +
        'IV route - (Acetadote):'+ '\n' +
        'Adult:'+ '\n' +
        '150 mg/kg in 200 mL diluent over 1 hour, then 50 mg/kg in 500 mL diluent over 4 hours'+
        '(12.5 mg/kg/h), then 100 mg/kg in 1000 mL diluent over 16 hours (6.25 mg/kg/h).'+ '\n' + '\n' +
        'For patients &gt; 100 kg, base dose on 100 kg.'+ '\n' + '\n' +
        'Children:'+ '\n' +
        'Same dose as for adults, but the amount of diluent will vary depending on weight. See'+
        'package insert of Acetadote for diluent amounts.'+ '\n' + '\n' + '\n' +
        
        '* Both oral and IV forms of N-acetylcysteine are similarly effective. Choose one or the other'+ 
        'based on clinical judgement, e.g. intractable vomiting.'+ '\n' ,
        symptoms: 'Since ingestion:' + '\n' +
        '&lt; 24hrs – Asymptomatic or anorexia, nausea, vomiting, malaise, pallor, diaphoresis' + '\n' +
        '1 – 3 days – Right upper quadrant pain, hepatomegaly, oliguria, elevated liver function tests/INR' + '\n' +
        '3 – 4 days – Return of anorexia, nausea, vomiting, malaise; signs of hepatic failure; renal failure, cardiomyopath; death' + '\n' +
        '4 – 14 days – Recovery; non-cardiogenic pulmonary edema; death',
        references: 'refreneces_info'
      })
    }
  }
  */ 
