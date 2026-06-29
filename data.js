const QUESTIONS = [
  { q: "¿Qué es la inteligencia artificial?", cat: "Fundamentos", opts: ["No tengo idea de qué es", "Algo relacionado con robots y ciencia ficción", "Sistemas informáticos que simulan capacidades de inteligencia humana", "Exclusivamente redes neuronales profundas"], correct: 2, diff: 0, explain: "La IA abarca cualquier sistema informático diseñado para realizar tareas que normalmente requieren inteligencia humana: aprender, razonar, percibir y tomar decisiones. No se limita a robots ni a redes neuronales." },
  { q: "¿Cuál es la relación entre IA, machine learning y deep learning?", cat: "Fundamentos", opts: ["Son tres nombres para lo mismo", "No estoy seguro de la diferencia", "ML es un subconjunto de IA; deep learning es un subconjunto de ML", "Deep learning es más simple y básico que machine learning"], correct: 2, diff: 1, explain: "Piénsalo como círculos concéntricos: la IA es el campo más amplio, el machine learning es una forma específica de lograr IA (aprendiendo de datos), y el deep learning es un tipo específico de ML que usa redes neuronales con muchas capas." },
  { q: "¿Qué es un dataset?", cat: "Datos", opts: ["Un tipo de algoritmo de IA", "Un conjunto organizado de datos usado para entrenar o evaluar modelos", "Un lenguaje de programación para IA", "No conozco el término"], correct: 1, diff: 0, explain: "Un dataset (conjunto de datos) es la materia prima de cualquier modelo de IA. Puede ser una tabla con miles de filas, una colección de imágenes etiquetadas, o un corpus de texto. Sin datos de calidad, no hay modelo que funcione." },
  { q: "¿Qué lenguaje de programación domina en IA y por qué?", cat: "Herramientas", opts: ["Java, por su velocidad", "Python, por su ecosistema de librerías y comunidad", "C++, por su eficiencia", "No conozco ningún lenguaje de IA"], correct: 1, diff: 1, explain: "Python domina gracias a librerías como NumPy, Pandas, Scikit-learn, PyTorch y TensorFlow. Su sintaxis simple permite iterar rápido. Aunque C++ se usa en producción por rendimiento, Python es el estándar para investigación y prototipado." },
  { q: "¿Qué es una red neuronal artificial?", cat: "Deep learning", opts: ["Un cable de fibra óptica para internet", "No estoy seguro", "Un modelo computacional inspirado en las neuronas biológicas del cerebro", "Una base de datos especial para IA"], correct: 2, diff: 1, explain: "Una red neuronal artificial es un modelo matemático compuesto por capas de 'neuronas' (unidades de cómputo). Cada neurona recibe entradas, las multiplica por pesos, aplica una función de activación, y produce una salida. Apilando capas, el modelo aprende representaciones cada vez más complejas." },
  { q: "¿Qué significa 'entrenar' un modelo de IA?", cat: "Machine learning", opts: ["Instalarlo en un servidor de producción", "Ajustar iterativamente sus parámetros internos usando datos para que minimice errores", "Escribir manualmente las reglas de decisión", "No estoy seguro del proceso"], correct: 1, diff: 2, explain: "Entrenar un modelo es un proceso iterativo: el modelo hace predicciones, se mide su error con una función de pérdida (loss function), y se ajustan sus parámetros (pesos) usando algoritmos como gradient descent para reducir ese error. Se repite miles o millones de veces." },
  { q: "¿Qué es overfitting y por qué es un problema?", cat: "Machine learning", opts: ["Cuando el modelo memoriza los datos de entrenamiento y no generaliza a datos nuevos", "Cuando el modelo es demasiado grande para la memoria", "Un error de sintaxis en el código", "No conozco el concepto"], correct: 0, diff: 2, explain: "Overfitting ocurre cuando el modelo aprende incluso el ruido y particularidades de los datos de entrenamiento, en lugar de los patrones generales. Resultado: excelente en entrenamiento, pésimo con datos nuevos. Es como memorizar un examen en vez de entender la materia." },
  { q: "¿Qué es la arquitectura Transformer?", cat: "NLP / LLMs", opts: ["Un robot que cambia de forma", "No conozco el término", "Una arquitectura de red neuronal basada en mecanismos de atención, revolucionó el NLP", "Un preprocesador de datos tabulares"], correct: 2, diff: 3, explain: "Introducida en el paper 'Attention Is All You Need' (2017), la arquitectura Transformer usa self-attention para que cada elemento de una secuencia pueda 'atender' a todos los demás, capturando relaciones a cualquier distancia. Es la base de GPT, BERT, Claude y prácticamente todos los LLMs modernos." },
  { q: "¿Qué es transfer learning?", cat: "Deep learning", opts: ["Mover datos entre servidores", "Tomar un modelo preentrenado en una tarea grande y adaptarlo a una tarea específica más pequeña", "No tengo idea", "Siempre hay que entrenar desde cero"], correct: 1, diff: 3, explain: "Transfer learning permite reutilizar el conocimiento que un modelo aprendió en una tarea (ej: clasificar millones de imágenes) y aplicarlo a otra tarea relacionada con pocos datos. Esto ahorra tiempo, cómputo y datos. Ejemplo: tomar ResNet preentrenado en ImageNet y adaptarlo para detectar enfermedades en radiografías." },
  { q: "¿Qué es un LLM (large language model)?", cat: "NLP / LLMs", opts: ["Un tipo especial de base de datos", "No estoy seguro", "Un modelo de lenguaje con miles de millones de parámetros, entrenado en cantidades masivas de texto", "Un framework de programación web"], correct: 2, diff: 3, explain: "Un LLM es un modelo Transformer de gran escala (miles de millones de parámetros) entrenado con el objetivo de predecir la siguiente palabra en secuencias de texto. Este entrenamiento, combinado con fine-tuning y RLHF, produce modelos capaces de generar texto, razonar, programar y más. Ejemplos: GPT-4, Claude, Llama, Gemini." }
];

const GLOSSARY = [
  { term: "Inteligencia artificial (IA)", def: "Campo de la informática que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana: aprender, razonar, percibir, decidir y comunicarse." },
  { term: "Machine learning (ML)", def: "Subcampo de la IA donde los sistemas aprenden patrones directamente de los datos, sin ser programados explícitamente para cada regla de decisión." },
  { term: "Deep learning", def: "Subcampo del ML que utiliza redes neuronales con múltiples capas (profundas) para aprender representaciones jerárquicas de los datos." },
  { term: "Red neuronal", def: "Modelo computacional inspirado en el cerebro, compuesto por capas de neuronas artificiales conectadas por pesos que se ajustan durante el entrenamiento." },
  { term: "Neurona artificial", def: "Unidad básica de una red neuronal. Recibe entradas, las multiplica por pesos, suma un sesgo (bias), aplica una función de activación y produce una salida." },
  { term: "Dataset", def: "Conjunto organizado de datos utilizado para entrenar, validar o evaluar un modelo de IA. Puede contener tablas, imágenes, texto, audio u otros formatos." },
  { term: "Feature (característica)", def: "Variable individual dentro de un dataset que describe un aspecto medible del dato. Ejemplo: en un dataset de casas, los features serían metros², habitaciones, ubicación, etc." },
  { term: "Label (etiqueta)", def: "El valor que queremos que el modelo prediga en aprendizaje supervisado. Ejemplo: en clasificación de email, la etiqueta es 'spam' o 'no spam'." },
  { term: "Entrenamiento", def: "Proceso iterativo de ajustar los parámetros (pesos) de un modelo usando datos para minimizar una función de pérdida. El modelo 've' los datos muchas veces (épocas)." },
  { term: "Función de pérdida (loss)", def: "Función matemática que mide qué tan lejos están las predicciones del modelo de los valores reales. El objetivo del entrenamiento es minimizarla." },
  { term: "Gradient descent", def: "Algoritmo de optimización que ajusta los pesos del modelo moviéndose en la dirección que más reduce la función de pérdida, paso a paso." },
  { term: "Learning rate", def: "Hiperparámetro que controla el tamaño de los pasos en gradient descent. Muy alto: el modelo no converge. Muy bajo: aprende demasiado lento." },
  { term: "Época (epoch)", def: "Una pasada completa por todos los datos de entrenamiento. Un modelo típico se entrena durante decenas o cientos de épocas." },
  { term: "Batch", def: "Subconjunto de datos procesado en una sola iteración de entrenamiento. El batch size afecta la estabilidad y velocidad del aprendizaje." },
  { term: "Overfitting", def: "Cuando el modelo memoriza los datos de entrenamiento (incluyendo ruido) y falla al generalizar a datos nuevos. Señal: alta accuracy en train, baja en test." },
  { term: "Underfitting", def: "Cuando el modelo es demasiado simple para capturar los patrones en los datos. Señal: baja accuracy tanto en train como en test." },
  { term: "Regularización", def: "Técnicas para prevenir overfitting añadiendo restricciones al modelo: L1 (Lasso), L2 (Ridge), dropout, early stopping, data augmentation." },
  { term: "Función de activación", def: "Función no lineal aplicada a la salida de cada neurona. Sin ella, la red sería una combinación lineal simple. Comunes: ReLU, sigmoid, tanh, softmax." },
  { term: "Backpropagation", def: "Algoritmo que calcula el gradiente de la función de pérdida respecto a cada peso de la red, propagando el error desde la salida hacia atrás, capa por capa." },
  { term: "Hiperparámetro", def: "Configuración que se define ANTES del entrenamiento y no se aprende de los datos: learning rate, número de capas, batch size, épocas, etc." },
  { term: "CNN (Convolutional Neural Network)", def: "Red neuronal especializada en datos con estructura espacial (imágenes). Usa filtros convolucionales que detectan patrones locales como bordes, texturas y formas." },
  { term: "RNN (Recurrent Neural Network)", def: "Red neuronal para datos secuenciales (texto, series de tiempo). Mantiene un estado oculto que funciona como 'memoria' de los pasos anteriores." },
  { term: "LSTM", def: "Long Short-Term Memory: variante de RNN con compuertas (forget, input, output) que resuelve el problema de vanishing gradients en secuencias largas." },
  { term: "Transformer", def: "Arquitectura de red neuronal basada en self-attention. No necesita procesar datos secuencialmente como las RNNs, lo que permite paralelización masiva. Base de todos los LLMs modernos." },
  { term: "Self-attention", def: "Mecanismo donde cada elemento de una secuencia calcula su relevancia respecto a todos los demás elementos, capturando dependencias a cualquier distancia." },
  { term: "Embedding", def: "Representación numérica densa (vector) de un objeto (palabra, imagen, usuario). Objetos similares tienen embeddings cercanos en el espacio vectorial." },
  { term: "Tokenización", def: "Proceso de dividir texto en unidades más pequeñas (tokens): palabras, subpalabras o caracteres. Los LLMs procesan tokens, no texto crudo." },
  { term: "LLM (Large Language Model)", def: "Modelo de lenguaje basado en Transformer con miles de millones de parámetros, entrenado en cantidades masivas de texto. Capaz de generar, analizar y razonar sobre texto." },
  { term: "Fine-tuning", def: "Proceso de tomar un modelo preentrenado y ajustar sus pesos con datos específicos de una tarea o dominio particular." },
  { term: "Transfer learning", def: "Técnica que reutiliza conocimiento de un modelo entrenado en una tarea grande para resolver una tarea nueva con menos datos." },
  { term: "Prompt engineering", def: "Arte y técnica de diseñar instrucciones (prompts) que guíen a un LLM a producir la respuesta deseada. Incluye zero-shot, few-shot y chain-of-thought." },
  { term: "RAG (Retrieval-Augmented Generation)", def: "Patrón que conecta un LLM a fuentes de conocimiento externas: primero busca información relevante, luego la inyecta en el contexto para generar respuestas fundamentadas." },
  { term: "Parámetro", def: "Valor numérico interno del modelo (peso o bias) que se ajusta durante el entrenamiento. GPT-4 tiene ~1.8 trillones de parámetros." },
  { term: "Inference (inferencia)", def: "El proceso de usar un modelo ya entrenado para hacer predicciones con datos nuevos. Es la fase de 'producción' del modelo." },
  { term: "RLHF", def: "Reinforcement Learning from Human Feedback: técnica de alineación donde humanos evalúan las respuestas del modelo y esa retroalimentación se usa para ajustarlo." },
  { term: "Accuracy", def: "Métrica que mide el porcentaje de predicciones correctas del total. Simple pero engañosa con datos desbalanceados." },
  { term: "Precision", def: "De todos los casos que el modelo predijo como positivos, ¿cuántos realmente lo eran? Alta precision = pocos falsos positivos." },
  { term: "Recall", def: "De todos los casos realmente positivos, ¿cuántos detectó el modelo? Alto recall = pocos falsos negativos." },
  { term: "F1-Score", def: "Media armónica de precision y recall. Útil cuando necesitas un balance entre ambos, especialmente con datos desbalanceados." },
  { term: "Cross-validation", def: "Técnica de evaluación que divide los datos en K partes, entrena K veces usando K-1 partes y evalúa con la restante, rotando cuál queda fuera." },
  { term: "GPU", def: "Graphics Processing Unit: procesador con miles de núcleos diseñados para operaciones paralelas en matrices, ideales para deep learning. NVIDIA domina con CUDA." },
  { term: "Prompt injection", def: "Ataque de seguridad donde un usuario malicioso manipula el prompt para alterar el comportamiento previsto del LLM." },
  { term: "Agente de IA", def: "Sistema basado en LLM que puede razonar, planificar y ejecutar acciones usando herramientas externas (APIs, bases de datos, código) para completar tareas complejas." }
];

const MODULES = [
  {
    title: "Fundamentos de IA", desc: "Qué es la IA, su historia, tipos, aplicaciones reales y consideraciones éticas", icon: "ti-bulb", color: "accent",
    lessons: [
      {
        title: "¿Qué es la inteligencia artificial?",
        content: `
<h3>Definición formal</h3>

<div class="def-box">
  <div class="def-term">Inteligencia artificial</div>
  <div class="def-text">Campo de la informática que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana: <strong>aprender</strong> de la experiencia, <strong>razonar</strong> sobre problemas, <strong>percibir</strong> el entorno y <strong>tomar decisiones</strong>.</div>
</div>

<p>La IA no es un invento reciente ni ciencia ficción. Es una disciplina científica con más de 70 años de historia que hoy impulsa desde el autocompletado de tu teléfono hasta el descubrimiento de nuevos medicamentos.</p>

<h3>Las 4 capacidades fundamentales</h3>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-brain" aria-hidden="true"></i> Aprendizaje</div>
  <p style="font-size:14px;color:var(--text2);">La capacidad de mejorar su rendimiento con la experiencia. A diferencia de la programación tradicional donde un humano escribe cada regla, un sistema de IA puede descubrir patrones por sí mismo a partir de datos.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-logic-and" aria-hidden="true"></i> Razonamiento</div>
  <p style="font-size:14px;color:var(--text2);">La capacidad de resolver problemas, hacer inferencias lógicas y tomar decisiones. Incluye desde diagnosticar una enfermedad a partir de síntomas hasta planificar la ruta más eficiente para un vehículo de reparto.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-eye" aria-hidden="true"></i> Percepción</div>
  <p style="font-size:14px;color:var(--text2);">La capacidad de interpretar información sensorial: ver imágenes (visión por computadora), entender texto (NLP), reconocer voz (speech recognition) y procesar señales del entorno.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-messages" aria-hidden="true"></i> Interacción</div>
  <p style="font-size:14px;color:var(--text2);">La capacidad de comunicarse con humanos de forma natural. Los chatbots, asistentes virtuales y sistemas de traducción automática son ejemplos de IA interactiva.</p>
</div>

<h3>IA vs. programación tradicional</h3>

<p>Esta es la diferencia fundamental que debes internalizar:</p>

<div class="concept-card" style="background:var(--accent-bg);">
  <p style="font-size:14px;margin-bottom:8px;"><strong>Programación tradicional:</strong> Un humano escribe reglas → el programa las ejecuta</p>
  <p style="font-size:14px;color:var(--text2);">Ejemplo: <em>"Si temperatura > 30°C, entonces encender ventilador"</em></p>
</div>

<div class="concept-card" style="background:var(--purple-bg);">
  <p style="font-size:14px;margin-bottom:8px;"><strong>Machine learning:</strong> Le das datos + resultados esperados → el modelo descubre las reglas</p>
  <p style="font-size:14px;color:var(--text2);">Ejemplo: <em>Le das miles de emails etiquetados como spam/no-spam → el modelo aprende a distinguirlos solo</em></p>
</div>

<h3>¿Por qué importa ahora?</h3>
<p>La IA existe desde los años 50, pero tres factores la han hecho explotar en la última década:</p>
<ul>
  <li><strong>Datos masivos:</strong> Internet genera 2.5 quintillones de bytes al día. Más datos = mejores modelos.</li>
  <li><strong>Poder de cómputo:</strong> Las GPUs modernas son miles de veces más potentes que las de hace 20 años.</li>
  <li><strong>Algoritmos mejores:</strong> Avances como los Transformers (2017) desbloquearon capacidades que antes eran imposibles.</li>
</ul>
`,
        resources: [
          { title: "¿Qué es la IA? — IBM", url: "https://www.ibm.com/topics/artificial-intelligence", type: "Artículo", icon: "ti-article", color: "blue" },
          { title: "AI for Everyone — Andrew Ng", url: "https://www.coursera.org/learn/ai-for-everyone", type: "Curso gratuito", icon: "ti-school", color: "green" },
          { title: "Intro to AI — Google", url: "https://ai.google/education/", type: "Recurso oficial", icon: "ti-brand-google", color: "red" }
        ],
        quiz: [
          { q: "¿Cuál es la diferencia FUNDAMENTAL entre programación tradicional y machine learning?", opts: ["ML es más lento", "En ML, el modelo descubre las reglas a partir de datos en vez de que un humano las escriba", "La programación tradicional no puede resolver problemas", "ML no necesita computadoras"], correct: 1, explain: "En programación tradicional, el humano codifica las reglas. En ML, el humano proporciona datos y resultados esperados, y el algoritmo descubre los patrones (reglas) automáticamente." },
          { q: "¿Cuáles son los tres factores que han impulsado la explosión de la IA en la última década?", opts: ["Más programadores, mejores monitores, internet más rápido", "Datos masivos, poder de cómputo (GPUs) y mejores algoritmos", "Legislación favorable, marketing y redes sociales", "Computación cuántica, 5G y blockchain"], correct: 1, explain: "La combinación de datos abundantes (internet), hardware potente (GPUs) y avances algorítmicos (deep learning, Transformers) es lo que hizo posible la IA moderna." },
          { q: "¿Cuál de estas NO es una capacidad fundamental de la IA?", opts: ["Aprendizaje", "Teletransportación de objetos físicos", "Percepción", "Razonamiento"], correct: 1, explain: "La IA opera en el mundo digital: aprende, razona, percibe datos y se comunica. No puede manipular el mundo físico directamente (excepto a través de robótica, que es un campo aparte)." }
        ]
      },
      {
        title: "Historia de la IA: del sueño a la realidad",
        content: `
<h3>Los pioneros (1940s-1950s)</h3>

<div class="def-box">
  <div class="def-term">Test de Turing (1950)</div>
  <div class="def-text">Prueba propuesta por Alan Turing: si una máquina puede mantener una conversación indistinguible de la de un humano, se puede considerar "inteligente". Aunque tiene limitaciones, fue el primer intento formal de definir inteligencia artificial.</div>
</div>

<p>En <strong>1956</strong>, en la conferencia de Dartmouth, John McCarthy acuñó oficialmente el término "inteligencia artificial". Los asistentes creían que en una generación, las máquinas igualarían la inteligencia humana. Estaban equivocados por décadas, pero su visión era correcta.</p>

<h3>La era del optimismo y los sistemas expertos (1960s-1980s)</h3>
<ul>
  <li><strong>1966 — ELIZA:</strong> Primer chatbot, simulaba un terapeuta. Simplemente reformulaba lo que decías como pregunta, pero muchos usuarios creían hablar con un humano.</li>
  <li><strong>1970s — Sistemas expertos:</strong> Programas con reglas "si-entonces" codificadas por expertos humanos. MYCIN diagnosticaba infecciones bacterianas mejor que muchos médicos.</li>
  <li><strong>1980s — Primer invierno de la IA:</strong> Las expectativas superaron la realidad. Los fondos se secaron. Lección: prometer demasiado destruye la confianza.</li>
</ul>

<h3>El renacimiento estadístico (1990s-2000s)</h3>
<ul>
  <li><strong>1997 — Deep Blue vs. Kasparov:</strong> La computadora de IBM venció al campeón mundial de ajedrez. No usaba IA "moderna" sino fuerza bruta con evaluación heurística, pero fue un hito simbólico.</li>
  <li><strong>2000s:</strong> El machine learning estadístico (SVM, Random Forest, Bayes) empezó a superar a los sistemas basados en reglas. Los datos se volvieron el recurso clave.</li>
</ul>

<h3>La revolución del deep learning (2010s)</h3>
<ul>
  <li><strong>2012 — AlexNet:</strong> Red neuronal profunda que arrasó en ImageNet, reduciendo errores de clasificación de imágenes a la mitad. Marcó el inicio del dominio del deep learning.</li>
  <li><strong>2016 — AlphaGo:</strong> DeepMind derrotó al campeón mundial de Go, un juego considerado demasiado complejo para las máquinas por su enorme espacio de posibilidades.</li>
  <li><strong>2017 — "Attention Is All You Need":</strong> Paper de Google que introdujo la arquitectura Transformer. Quizás el paper más influyente en la historia de la IA moderna.</li>
</ul>

<h3>La era de los LLMs (2020s)</h3>
<ul>
  <li><strong>2020 — GPT-3:</strong> Demostró que escalar modelos de lenguaje produce capacidades emergentes sorprendentes.</li>
  <li><strong>2022 — ChatGPT:</strong> Llevó la IA generativa al público masivo. 100 millones de usuarios en 2 meses.</li>
  <li><strong>2023-2025 — Claude, GPT-4, Gemini, Llama:</strong> Modelos multimodales, agentes autónomos, IA que programa, razona y usa herramientas.</li>
</ul>

<div class="concept-card" style="background:var(--amber-bg);">
  <div class="concept-title" style="color:var(--amber-t);"><i class="ti ti-bulb" aria-hidden="true" style="color:var(--amber);"></i> Lección clave de la historia</div>
  <p style="font-size:14px;color:var(--amber-t);">La IA avanza en ciclos de hype y "inviernos". Lo que la diferencia esta vez es que los resultados son reales: los LLMs, la visión artificial y los agentes están en producción, no en papers académicos.</p>
</div>
`,
        resources: [
          { title: "Breve historia de la IA — Stanford HAI", url: "https://hai.stanford.edu/", type: "Artículo académico", icon: "ti-school", color: "purple" },
          { title: "Attention Is All You Need (paper original)", url: "https://arxiv.org/abs/1706.03762", type: "Paper fundacional", icon: "ti-file-text", color: "accent" }
        ],
        quiz: [
          { q: "¿Qué evento de 2017 transformó radicalmente el campo del NLP y dio origen a todos los LLMs modernos?", opts: ["AlphaGo venció al campeón de Go", "La publicación del paper 'Attention Is All You Need' que introdujo los Transformers", "El lanzamiento de ChatGPT", "La creación de Python 3"], correct: 1, explain: "El paper de Vaswani et al. introdujo la arquitectura Transformer con self-attention, reemplazando las RNNs como estándar. GPT, BERT, Claude y todos los LLMs modernos están construidos sobre esta arquitectura." },
          { q: "¿Por qué los años 80 se conocen como el 'invierno de la IA'?", opts: ["Hacía mucho frío en los laboratorios", "Las expectativas exageradas no se cumplieron y los fondos se secaron", "Se prohibió la investigación en IA", "Los computadores se volvieron más lentos"], correct: 1, explain: "Los investigadores prometieron más de lo que la tecnología podía entregar. Cuando los sistemas expertos mostraron sus limitaciones, los gobiernos y empresas retiraron fondos. Es una lección sobre gestionar expectativas en tecnología." }
        ]
      },
      {
        title: "Tipos de inteligencia artificial",
        content: `
<h3>Clasificación por capacidad</h3>

<div class="def-box">
  <div class="def-term">IA Estrecha (ANI — Artificial Narrow Intelligence)</div>
  <div class="def-text">IA diseñada y entrenada para una tarea específica. Es <strong>todo lo que existe hoy</strong>. Un modelo que detecta spam no puede conducir un auto, y viceversa. Cada sistema es un especialista, no un generalista.</div>
</div>

<p>Ejemplos de ANI que usas a diario:</p>
<ul>
  <li>El algoritmo de recomendaciones de YouTube (predice qué video querrás ver)</li>
  <li>Siri/Alexa (procesan voz y ejecutan comandos)</li>
  <li>Gmail separando spam (clasifica emails)</li>
  <li>Google Maps prediciendo tráfico (analiza patrones de movimiento)</li>
</ul>

<div class="def-box" style="background:var(--amber-bg);border-color:rgba(217,119,6,0.15);">
  <div class="def-term" style="color:var(--amber-t);">IA General (AGI — Artificial General Intelligence)</div>
  <div class="def-text">IA hipotética con capacidad cognitiva equivalente a la humana: podría aprender cualquier tarea intelectual que un humano puede hacer. <strong>No existe todavía.</strong> Es el objetivo de largo plazo de laboratorios como OpenAI, DeepMind y Anthropic.</div>
</div>

<div class="def-box" style="background:var(--red-bg);border-color:rgba(220,38,38,0.15);">
  <div class="def-term" style="color:var(--red-t);">Superinteligencia (ASI — Artificial Super Intelligence)</div>
  <div class="def-text">IA que supera la inteligencia humana en todos los dominios. Es un concepto teórico y filosófico. No hay consenso sobre si es posible, deseable o cuándo podría ocurrir.</div>
</div>

<h3>Clasificación por enfoque técnico</h3>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-code" aria-hidden="true"></i> IA simbólica (Good Old-Fashioned AI)</div>
  <p style="font-size:14px;color:var(--text2);">Usa reglas lógicas explícitas escritas por humanos. "Si paciente tiene fiebre Y tos Y dificultad respiratoria, ENTONCES considerar neumonía". Limitada pero explicable. Dominó los años 70-90.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-network" aria-hidden="true"></i> IA conexionista (redes neuronales)</div>
  <p style="font-size:14px;color:var(--text2);">Aprende patrones de datos sin reglas explícitas. "Dame 10,000 radiografías etiquetadas y yo aprendo a detectar neumonía solo". Poderosa pero menos explicable. Domina la era actual.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-arrows-join" aria-hidden="true"></i> IA híbrida</div>
  <p style="font-size:14px;color:var(--text2);">Combina lo mejor de ambos mundos: redes neuronales para percepción + reglas lógicas para razonamiento y seguridad. Tendencia creciente, especialmente en aplicaciones críticas (salud, finanzas).</p>
</div>
`,
        resources: [
          { title: "ANI vs AGI vs ASI — explicación visual", url: "https://www.youtube.com/results?search_query=ANI+AGI+ASI+explained", type: "Video", icon: "ti-brand-youtube", color: "red" },
          { title: "Types of AI — Google AI", url: "https://ai.google/education/", type: "Recurso interactivo", icon: "ti-brand-google", color: "blue" }
        ],
        quiz: [
          { q: "¿Cuál es el tipo de IA que existe actualmente en producción?", opts: ["AGI — IA general", "ANI — IA estrecha, especializada en tareas específicas", "ASI — Superinteligencia", "IA cuántica"], correct: 1, explain: "Todo lo que usamos hoy es ANI: cada modelo es especialista en su tarea. ChatGPT es excelente generando texto pero no puede ver, Midjourney genera imágenes pero no conversa. No existe aún un sistema que sea genuinamente bueno en todo como un humano." },
          { q: "¿Cuál es la ventaja principal de la IA simbólica frente a la conexionista?", opts: ["Es más precisa siempre", "Sus decisiones son explicables porque se basan en reglas lógicas", "Necesita más datos", "Es más moderna"], correct: 1, explain: "La IA simbólica dice exactamente POR QUÉ tomó una decisión (la regla X se cumplió). Las redes neuronales son más potentes pero son 'cajas negras' — saben la respuesta pero no siempre pueden explicar el razonamiento." }
        ]
      },
      {
        title: "IA en tu vida diaria: aplicaciones reales",
        content: `
<h3>La IA invisible que ya usas</h3>
<p>Probablemente interactúas con docenas de sistemas de IA al día sin darte cuenta. Veamos los más comunes:</p>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-device-mobile" aria-hidden="true"></i> Tu teléfono</div>
  <ul style="font-size:14px;color:var(--text2);">
    <li><strong>Face ID / desbloqueo facial:</strong> Una CNN (red neuronal convolucional) mapea tu rostro en un espacio de 128 dimensiones y compara con el registro almacenado</li>
    <li><strong>Autocompletado de teclado:</strong> Un modelo de lenguaje predice la siguiente palabra basándose en las anteriores</li>
    <li><strong>Fotos "mejoradas":</strong> Redes neuronales ajustan iluminación, reducen ruido y hasta borran objetos</li>
    <li><strong>Asistente de voz:</strong> ASR (reconocimiento de voz) convierte audio a texto → NLU (comprensión) entiende la intención → el sistema ejecuta</li>
  </ul>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-world" aria-hidden="true"></i> Internet y redes sociales</div>
  <ul style="font-size:14px;color:var(--text2);">
    <li><strong>Feed personalizado:</strong> Algoritmos de recomendación predicen qué contenido te mantendrá enganchado analizando tus patrones de interacción</li>
    <li><strong>Detección de contenido:</strong> Modelos de visión y NLP identifican contenido violento, spam o desinformación a escala</li>
    <li><strong>Traducción automática:</strong> Google Translate usa modelos Transformer para traducir entre 130+ idiomas</li>
    <li><strong>Búsqueda:</strong> Google usa ML para entender la INTENCIÓN detrás de tu búsqueda, no solo las palabras clave</li>
  </ul>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-building-bank" aria-hidden="true"></i> Industrias transformadas</div>
  <ul style="font-size:14px;color:var(--text2);">
    <li><strong>Salud:</strong> Modelos que detectan cáncer en radiografías con accuracy superior a radiólogos humanos. AlphaFold predijo la estructura 3D de 200 millones de proteínas.</li>
    <li><strong>Finanzas:</strong> Detección de fraude en tiempo real analizando patrones de transacciones. Trading algorítmico. Scoring crediticio.</li>
    <li><strong>Transporte:</strong> Vehículos autónomos combinan visión por computadora, sensores LiDAR y redes neuronales para navegar.</li>
    <li><strong>Agricultura:</strong> Drones con visión artificial detectan plagas y optimizan riego. Modelos predicen cosechas.</li>
    <li><strong>Educación:</strong> Tutores adaptativos que ajustan el nivel de dificultad según el rendimiento del estudiante (¡como esta plataforma!).</li>
  </ul>
</div>

<div class="concept-card" style="background:var(--accent-bg);">
  <div class="concept-title"><i class="ti ti-trending-up" aria-hidden="true"></i> Dato clave</div>
  <p style="font-size:14px;color:var(--accent-t);">Según McKinsey, la IA generativa podría aportar entre $2.6 y $4.4 trillones de dólares anuales a la economía global. Para 2030, se estima que el 70% de las empresas usarán alguna forma de IA.</p>
</div>
`,
        resources: [
          { title: "AI Index Report 2024 — Stanford", url: "https://aiindex.stanford.edu/report/", type: "Informe anual", icon: "ti-chart-bar", color: "purple" },
          { title: "Google AI Experiments", url: "https://experiments.withgoogle.com/collection/ai", type: "Demos interactivas", icon: "ti-player-play", color: "green" },
          { title: "Papers With Code — Estado del arte", url: "https://paperswithcode.com/", type: "Benchmarks", icon: "ti-chart-dots-3", color: "accent" }
        ],
        quiz: [
          { q: "¿Qué tipo de red neuronal usa Face ID para reconocer tu rostro?", opts: ["RNN", "CNN (red neuronal convolucional)", "Transformer", "Red bayesiana"], correct: 1, explain: "Face ID usa una CNN que mapea tu rostro a un vector numérico en un espacio de alta dimensión. Cada vez que desbloqueas, compara el vector actual con el almacenado. Las CNNs son el estándar para procesamiento de imágenes." },
          { q: "¿Cuál fue el logro histórico de AlphaFold?", opts: ["Ganar partidas de ajedrez", "Predecir la estructura 3D de 200 millones de proteínas", "Generar imágenes fotorrealistas", "Crear música original"], correct: 1, explain: "AlphaFold de DeepMind resolvió uno de los mayores desafíos de la biología: predecir cómo se pliega una proteína en 3D a partir de su secuencia de aminoácidos. Esto acelera enormemente el descubrimiento de fármacos y la comprensión de enfermedades." }
        ]
      },
      {
        title: "Ética en IA: poder con responsabilidad",
        content: `
<h3>¿Por qué la ética es urgente?</h3>
<p>La IA toma decisiones que afectan vidas reales: quién recibe un préstamo, quién es contratado, qué noticias ves, si una imagen médica se clasifica como benigna o maligna. Con ese poder viene una responsabilidad enorme.</p>

<div class="def-box" style="background:var(--red-bg);border-color:rgba(220,38,38,0.15);">
  <div class="def-term" style="color:var(--red-t);">Sesgo algorítmico (algorithmic bias)</div>
  <div class="def-text">Cuando un modelo de IA reproduce o amplifica prejuicios presentes en los datos de entrenamiento. Si entrenas un modelo de contratación con datos históricos donde el 90% de los contratados eran hombres, el modelo aprenderá a preferir hombres — no porque sea correcto, sino porque refleja el sesgo del pasado.</div>
</div>

<h3>Los 5 grandes desafíos éticos</h3>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-scale" aria-hidden="true"></i> 1. Sesgo y equidad</div>
  <p style="font-size:14px;color:var(--text2);">Caso real: En 2018, Amazon descubrió que su herramienta de contratación con IA penalizaba currículos que mencionaban "women's" (ej: "women's chess club"). Fue entrenada con 10 años de contrataciones donde dominaban los hombres. Tuvieron que descartarla.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-lock" aria-hidden="true"></i> 2. Privacidad</div>
  <p style="font-size:14px;color:var(--text2);">Los modelos necesitan datos, y muchos de esos datos son personales. ¿Quién tiene acceso? ¿Cómo se almacenan? ¿Puede un LLM "recordar" y revelar datos privados de su entrenamiento? El GDPR en Europa y leyes similares intentan regular esto.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-eye-off" aria-hidden="true"></i> 3. Transparencia y explicabilidad</div>
  <p style="font-size:14px;color:var(--text2);">Un modelo rechaza tu solicitud de crédito. ¿Tienes derecho a saber por qué? Las redes neuronales profundas son "cajas negras" — dan respuestas pero no explican su razonamiento. El campo de Explainable AI (XAI) busca resolver esto.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-briefcase" aria-hidden="true"></i> 4. Impacto laboral</div>
  <p style="font-size:14px;color:var(--text2);">La IA automatiza tareas, no necesariamente trabajos completos. Históricamente, la tecnología ha creado más empleos de los que ha destruido, pero la transición puede ser dolorosa. La clave: adaptarse y aprender a trabajar CON la IA, no contra ella.</p>
</div>

<div class="concept-card">
  <div class="concept-title"><i class="ti ti-photo-off" aria-hidden="true"></i> 5. Desinformación</div>
  <p style="font-size:14px;color:var(--text2);">Deepfakes de video, texto generado sin verificación, imágenes falsas indistinguibles de fotos reales. La IA generativa hace que crear contenido falso sea trivial. Detectar y combatir la desinformación es uno de los retos más urgentes.</p>
</div>

<div class="concept-card" style="background:var(--green-bg);">
  <div class="concept-title" style="color:var(--green-t);"><i class="ti ti-shield-check" aria-hidden="true" style="color:var(--green);"></i> IA responsable: principios guía</div>
  <ul style="font-size:14px;color:var(--green-t);">
    <li><strong>Equidad:</strong> Auditar modelos para detectar y mitigar sesgos</li>
    <li><strong>Transparencia:</strong> Documentar cómo se entrenan y qué datos usan</li>
    <li><strong>Privacidad:</strong> Minimizar datos recolectados, anonimizar cuando sea posible</li>
    <li><strong>Seguridad:</strong> Red teaming, guardrails, monitoreo continuo</li>
    <li><strong>Rendición de cuentas:</strong> Siempre debe haber un humano responsable</li>
  </ul>
</div>
`,
        resources: [
          { title: "AI Ethics Guidelines — UNESCO", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics", type: "Guía oficial", icon: "ti-world", color: "blue" },
          { title: "Responsible AI — Anthropic", url: "https://www.anthropic.com/research", type: "Investigación", icon: "ti-shield-check", color: "green" },
          { title: "EU AI Act — resumen", url: "https://artificialintelligenceact.eu/", type: "Regulación", icon: "ti-gavel", color: "amber" }
        ],
        quiz: [
          { q: "¿Qué es el sesgo algorítmico?", opts: ["Un error de sintaxis en el código", "Cuando un modelo reproduce o amplifica prejuicios presentes en los datos de entrenamiento", "Un tipo de regularización", "Una técnica de optimización"], correct: 1, explain: "El sesgo algorítmico no es intencional — el modelo simplemente aprende los patrones de los datos, incluyendo los sesgos históricos. Por eso es crucial auditar los datasets y los resultados del modelo con métricas de equidad." },
          { q: "¿Por qué las redes neuronales profundas se consideran 'cajas negras'?", opts: ["Porque son de color negro", "Porque dan respuestas precisas pero no pueden explicar el razonamiento detrás de sus decisiones", "Porque son secretas", "Porque solo funcionan en la oscuridad"], correct: 1, explain: "Una red neuronal con millones de parámetros produce resultados a través de transformaciones matemáticas complejas que no se traducen fácilmente a explicaciones humanas. El campo de Explainable AI (XAI) trabaja en técnicas como SHAP y LIME para hacer estos modelos más interpretables." }
        ]
      }
    ]
  },
  {
    title: "Datos: el combustible de la IA", desc: "Tipos de datos, limpieza, feature engineering, herramientas y división de datasets", icon: "ti-database", color: "green",
    lessons: [
      {
        title: "Tipos de datos y por qué importan",
        content: `<h3>Sin datos, no hay IA</h3>
<p>La calidad y tipo de tus datos determina qué modelos puedes usar y qué tan buenos serán los resultados. Esta lección te enseña a pensar en datos como un científico de datos.</p>

<div class="def-box"><div class="def-term">Dataset</div><div class="def-text">Colección organizada de datos utilizada para entrenar, validar o evaluar un modelo. Puede ser una tabla de Excel con 1,000 filas, una carpeta con 50,000 imágenes etiquetadas, o un archivo de texto con millones de oraciones.</div></div>

<h3>Los 3 tipos de datos por estructura</h3>

<div class="concept-card"><div class="concept-title"><i class="ti ti-table" aria-hidden="true"></i> Datos estructurados (20% del total mundial)</div>
<p style="font-size:14px;color:var(--text2);">Organizados en tablas con filas y columnas. Cada columna tiene un tipo definido. Fáciles de consultar con SQL y procesar con Pandas.</p>
<p style="font-size:13px;color:var(--text3);margin-top:4px;"><em>Ejemplos: bases de datos SQL, hojas de Excel, CSVs, datos financieros</em></p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-photo" aria-hidden="true"></i> Datos no estructurados (80% del total)</div>
<p style="font-size:14px;color:var(--text2);">Sin formato predefinido. Requieren técnicas especializadas (NLP, visión por computadora) para extraer información. Son el 80% de los datos del mundo y los más difíciles de aprovechar.</p>
<p style="font-size:13px;color:var(--text3);margin-top:4px;"><em>Ejemplos: texto libre, imágenes, audio, video, publicaciones en redes sociales</em></p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-code" aria-hidden="true"></i> Datos semi-estructurados</div>
<p style="font-size:14px;color:var(--text2);">Tienen algo de organización pero no encajan en tablas. Usan etiquetas o marcadores para separar elementos.</p>
<p style="font-size:13px;color:var(--text3);margin-top:4px;"><em>Ejemplos: JSON, XML, emails, logs de servidor, HTML</em></p></div>

<h3>Variables: las columnas de tus datos</h3>
<div class="def-box"><div class="def-term">Feature (característica / variable)</div><div class="def-text">Cada atributo individual y medible de tus datos. En un dataset de casas: metros cuadrados, número de habitaciones, ubicación, antigüedad. Elegir los features correctos es más importante que elegir el algoritmo correcto.</div></div>

<ul>
<li><strong>Numéricos continuos:</strong> Valores infinitos en un rango — temperatura (36.5°), precio ($1,234.56), peso (72.3 kg)</li>
<li><strong>Numéricos discretos:</strong> Valores contables enteros — cantidad de hijos (0, 1, 2), habitaciones (3)</li>
<li><strong>Categóricos nominales:</strong> Categorías sin orden — color (rojo, azul), país (Colombia, México)</li>
<li><strong>Categóricos ordinales:</strong> Categorías con orden — talla (S < M < L < XL), satisfacción (baja < media < alta)</li>
<li><strong>Texto:</strong> Lenguaje natural libre — reviews, tweets, documentos</li>
<li><strong>Temporales:</strong> Series de tiempo — precio diario de una acción, temperatura por hora</li>
</ul>`,
        resources: [
          { title: "Kaggle Datasets — Explora datasets reales", url: "https://www.kaggle.com/datasets", type: "Práctica", icon: "ti-database", color: "blue" },
          { title: "Pandas en 10 minutos (oficial)", url: "https://pandas.pydata.org/docs/user_guide/10min.html", type: "Tutorial", icon: "ti-code", color: "green" }
        ],
        quiz: [
          { q: "¿Qué porcentaje de los datos del mundo son no estructurados?", opts: ["20%", "50%", "80%", "95%"], correct: 2, explain: "Aproximadamente el 80% de los datos del mundo son no estructurados: imágenes, texto, audio, video. Esta es exactamente la razón por la que tecnologías como deep learning y NLP son tan valiosas — permiten extraer información útil de este tipo de datos." },
          { q: "La talla de ropa (S, M, L, XL) es un dato:", opts: ["Numérico continuo", "Numérico discreto", "Categórico ordinal (tiene orden natural)", "Categórico nominal (sin orden)"], correct: 2, explain: "Las tallas tienen un orden natural (S < M < L < XL) pero no son numéricas. Esto las hace categóricas ordinales. Es importante distinguir esto porque ciertos algoritmos pueden aprovechar el orden (ordinal encoding) en lugar de tratar cada categoría como independiente." }
        ]
      },
      {
        title: "Limpieza de datos: la tarea más importante",
        content: `<h3>Basura entra, basura sale</h3>
<div class="def-box"><div class="def-term">Data cleaning (limpieza de datos)</div><div class="def-text">Proceso de identificar y corregir errores, inconsistencias, valores faltantes y anomalías en un dataset antes de usarlo para entrenar un modelo. Se estima que los científicos de datos pasan entre el 60% y 80% de su tiempo en esta tarea.</div></div>

<p>Un modelo entrenado con datos sucios producirá predicciones sucias. No importa cuán sofisticado sea el algoritmo — si los datos tienen errores, el modelo aprenderá esos errores.</p>

<h3>Los 5 problemas más comunes</h3>

<div class="concept-card"><div class="concept-title"><i class="ti ti-question-mark" aria-hidden="true"></i> 1. Valores faltantes (missing values)</div>
<p style="font-size:14px;color:var(--text2);">Celdas vacías o nulas. Opciones: <strong>Eliminar</strong> la fila (si son pocos), <strong>imputar</strong> con la media/mediana/moda, o usar <strong>modelos de imputación</strong> que predicen el valor faltante.</p>
<div class="code-block"><span class="code-lang">Python</span><code><span class="cm"># Ver valores faltantes por columna</span>
df.isnull().sum()

<span class="cm"># Imputar con la mediana</span>
df[<span class="str">'edad'</span>].fillna(df[<span class="str">'edad'</span>].median(), inplace=<span class="kw">True</span>)</code></div></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-copy" aria-hidden="true"></i> 2. Duplicados</div>
<p style="font-size:14px;color:var(--text2);">Registros repetidos que sesgan el modelo. Un cliente duplicado 5 veces tendrá 5x más influencia en el entrenamiento.</p>
<div class="code-block"><span class="code-lang">Python</span><code><span class="cm"># Encontrar y eliminar duplicados</span>
df.duplicated().sum()  <span class="cm"># Cuántos hay</span>
df.drop_duplicates(inplace=<span class="kw">True</span>)</code></div></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-chart-dots" aria-hidden="true"></i> 3. Outliers (valores atípicos)</div>
<p style="font-size:14px;color:var(--text2);">Valores extremadamente fuera del rango normal. Un salario de $999,999,999 probablemente es un error de captura. Pero un outlier también puede ser un dato genuinamente raro (un fraude real). Hay que investigar antes de eliminar.</p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-text-size" aria-hidden="true"></i> 4. Inconsistencias de formato</div>
<p style="font-size:14px;color:var(--text2);">"Colombia", "colombia", "COLOMBIA", "CO" — para el modelo son 4 categorías distintas. Fechas en diferentes formatos (DD/MM/YYYY vs MM-DD-YYYY). Monedas mezcladas. La estandarización es crucial.</p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-letter-case" aria-hidden="true"></i> 5. Tipos de datos incorrectos</div>
<p style="font-size:14px;color:var(--text2);">Un código postal guardado como número (Python intentará calcular el "promedio" de códigos postales). Una fecha como texto. Asegúrate de que cada columna tenga el tipo correcto.</p></div>`,
        resources: [
          { title: "Data Cleaning con Pandas — guía completa", url: "https://realpython.com/python-data-cleaning-numpy-pandas/", type: "Tutorial", icon: "ti-code", color: "green" },
          { title: "Kaggle — Data Cleaning Course", url: "https://www.kaggle.com/learn/data-cleaning", type: "Curso interactivo", icon: "ti-school", color: "blue" }
        ],
        quiz: [
          { q: "¿Por qué NO debes eliminar automáticamente todos los outliers?", opts: ["Porque son bonitos", "Porque un outlier puede ser un dato genuinamente raro y valioso (ej: un fraude real)", "Porque Python no lo permite", "Porque siempre mejoran el modelo"], correct: 1, explain: "Los outliers merecen investigación: un salario de $999M probablemente es un error de captura, pero una transacción inusual en tu tarjeta podría ser un fraude real. Eliminar indiscriminadamente puede borrar los datos más interesantes." },
          { q: "¿Qué porcentaje de tiempo gastan los científicos de datos en limpieza?", opts: ["10-20%", "30-40%", "60-80%", "Solo si sobra tiempo"], correct: 2, explain: "Según encuestas de la industria, el 60-80% del tiempo de un científico de datos se dedica a obtener, limpiar y preparar datos. No es glamoroso, pero es la base de todo modelo exitoso." }
        ]
      },
      {
        title: "Feature engineering: el arte de crear variables",
        content: `<div class="def-box"><div class="def-term">Feature engineering</div><div class="def-text">Proceso de usar conocimiento del dominio para crear, transformar o seleccionar las variables (features) que el modelo usará para aprender. Es frecuentemente más impactante que cambiar el algoritmo.</div></div>

<h3>¿Por qué es tan importante?</h3>
<p>Un modelo de machine learning solo es tan bueno como los datos que le das. Feature engineering es el puente entre datos crudos e información útil.</p>

<div class="concept-card" style="background:var(--accent-bg);"><div class="concept-title"><i class="ti ti-bulb" aria-hidden="true"></i> Regla de oro</div><p style="font-size:14px;color:var(--accent-t);">"Un buen feature engineering con un modelo simple casi siempre supera a un mal feature engineering con un modelo complejo."</p></div>

<h3>Técnicas fundamentales</h3>

<div class="concept-card"><div class="concept-title"><i class="ti ti-transform" aria-hidden="true"></i> Transformación</div>
<p style="font-size:14px;color:var(--text2);">Cambiar la escala o distribución de los datos para que el modelo los aproveche mejor:</p>
<ul style="font-size:14px;color:var(--text2);">
<li><strong>Normalización (min-max):</strong> Escala valores al rango [0, 1]. Útil para redes neuronales.</li>
<li><strong>Estandarización (z-score):</strong> Media = 0, desviación = 1. Útil para SVM, regresión logística.</li>
<li><strong>Log transform:</strong> Comprime rangos enormes (salarios de $1K a $1M).</li>
</ul>
<div class="code-block"><span class="code-lang">Python</span><code><span class="kw">from</span> sklearn.preprocessing <span class="kw">import</span> StandardScaler
scaler = StandardScaler()
df[<span class="str">'edad_scaled'</span>] = scaler.fit_transform(df[[<span class="str">'edad'</span>]])</code></div></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-binary-tree" aria-hidden="true"></i> Codificación de categorías</div>
<div class="def-box"><div class="def-term">One-hot encoding</div><div class="def-text">Convierte cada categoría en una columna binaria (0/1). "Color" con valores rojo, azul, verde se convierte en 3 columnas: color_rojo, color_azul, color_verde. Cada fila tiene un 1 en su categoría y 0 en las demás.</div></div>
<div class="code-block"><span class="code-lang">Python</span><code>df_encoded = pd.get_dummies(df, columns=[<span class="str">'color'</span>])
<span class="cm"># color_rojo  color_azul  color_verde</span>
<span class="cm">#    1           0           0      (era rojo)</span>
<span class="cm">#    0           1           0      (era azul)</span></code></div></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-plus" aria-hidden="true"></i> Creación de features</div>
<p style="font-size:14px;color:var(--text2);">Combinar variables existentes para crear información nueva:</p>
<ul style="font-size:14px;color:var(--text2);">
<li>Fecha de nacimiento → <strong>edad</strong></li>
<li>Precio + metros² → <strong>precio por m²</strong></li>
<li>Fecha de compra → <strong>día de la semana</strong>, <strong>mes</strong>, <strong>es fin de semana?</strong></li>
</ul></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-filter" aria-hidden="true"></i> Selección de features</div>
<p style="font-size:14px;color:var(--text2);">No todos los features son útiles. Algunos son redundantes, ruidosos o irrelevantes. Técnicas: correlación, importancia de features (Random Forest), eliminación recursiva (RFE).</p></div>`,
        resources: [
          { title: "Feature Engineering — Kaggle Course", url: "https://www.kaggle.com/learn/feature-engineering", type: "Curso interactivo", icon: "ti-school", color: "blue" },
          { title: "Scikit-learn Preprocessing", url: "https://scikit-learn.org/stable/modules/preprocessing.html", type: "Documentación", icon: "ti-book", color: "green" }
        ],
        quiz: [
          { q: "¿Qué hace el one-hot encoding?", opts: ["Elimina columnas", "Convierte categorías en columnas binarias (0/1), una por categoría", "Normaliza números al rango 0-1", "Selecciona los mejores features"], correct: 1, explain: "One-hot encoding transforma una columna categórica en múltiples columnas binarias. Es necesario porque la mayoría de modelos ML trabajan con números, no con texto. Si tienes 'color' = [rojo, azul, verde], obtienes 3 columnas nuevas." }
        ]
      },
      {
        title: "División de datos: train, validation, test",
        content: `<h3>La regla de oro: nunca evalúes con datos de entrenamiento</h3>

<div class="def-box"><div class="def-term">Data splitting (división de datos)</div><div class="def-text">Separar tu dataset en subconjuntos independientes para entrenar, ajustar y evaluar el modelo. Esto previene que el modelo "memorice" respuestas y asegura que mides su capacidad real de generalización.</div></div>

<p>Imagina que estudias para un examen usando exactamente las mismas preguntas que vendrán. Sacarás 100%, pero no aprendiste nada. Lo mismo ocurre con un modelo evaluado con sus datos de entrenamiento.</p>

<h3>Los 3 conjuntos</h3>

<div class="concept-card" style="border-left:3px solid var(--accent);"><div class="concept-title"><i class="ti ti-school" aria-hidden="true"></i> Training set (60-80%)</div><p style="font-size:14px;color:var(--text2);">Los datos con los que el modelo aprende. Ve estos datos miles de veces durante el entrenamiento, ajustando sus pesos en cada iteración.</p></div>

<div class="concept-card" style="border-left:3px solid var(--amber);"><div class="concept-title"><i class="ti ti-adjustments" aria-hidden="true"></i> Validation set (10-20%)</div><p style="font-size:14px;color:var(--text2);">Se usa para ajustar hiperparámetros (learning rate, número de capas, etc.) y detectar overfitting durante el entrenamiento. El modelo NO aprende de estos datos, pero tus decisiones de diseño sí se basan en ellos.</p></div>

<div class="concept-card" style="border-left:3px solid var(--green);"><div class="concept-title"><i class="ti ti-trophy" aria-hidden="true"></i> Test set (10-20%)</div><p style="font-size:14px;color:var(--text2);">La evaluación final. Solo se usa UNA VEZ, cuando el modelo está completamente terminado. Es tu estimación más honesta de cómo se comportará en el mundo real.</p></div>

<div class="code-block"><span class="code-lang">Python</span><code><span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> train_test_split

<span class="cm"># Primero separar test (20%)</span>
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=<span class="num">0.2</span>, random_state=<span class="num">42</span>)

<span class="cm"># Luego separar validation del resto (25% del 80% = 20% total)</span>
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=<span class="num">0.25</span>, random_state=<span class="num">42</span>)</code></div>

<h3>Cross-validation: evaluación más robusta</h3>
<div class="def-box"><div class="def-term">K-Fold Cross-validation</div><div class="def-text">Divide los datos en K partes iguales. Entrena K veces, cada vez usando K-1 partes para entrenar y 1 para validar, rotando cuál queda fuera. El resultado final es el promedio de las K evaluaciones. Produce estimaciones más robustas que una sola división.</div></div>`,
        resources: [
          { title: "Cross-validation explicado visualmente", url: "https://scikit-learn.org/stable/modules/cross_validation.html", type: "Documentación", icon: "ti-book", color: "green" },
          { title: "Intro to ML — Kaggle", url: "https://www.kaggle.com/learn/intro-to-machine-learning", type: "Curso", icon: "ti-school", color: "blue" }
        ],
        quiz: [
          { q: "¿Por qué el test set solo se debe usar UNA vez?", opts: ["Por limitaciones de memoria", "Porque si lo usas repetidamente para tomar decisiones, terminas 'ajustando' indirectamente al test set y pierdes la evaluación objetiva", "Porque Python lo borra después de usarlo", "No hay razón real, es solo tradición"], correct: 1, explain: "Si usas el test set para tomar decisiones (cambiar hiperparámetros, seleccionar features, elegir modelo), estás filtrando información del test al proceso de entrenamiento. Tus métricas se volverán optimistas y no reflejarán el rendimiento real." }
        ]
      },
      {
        title: "Herramientas esenciales del científico de datos",
        content: `<h3>Tu kit de herramientas</h3>
<p>No necesitas dominar todas desde el día 1. Empieza con Python + Pandas + un notebook, y ve expandiendo.</p>

<div class="concept-card"><div class="concept-title"><i class="ti ti-brand-python" aria-hidden="true"></i> Python</div>
<p style="font-size:14px;color:var(--text2);">El lenguaje dominante en IA por su ecosistema de librerías, sintaxis limpia y comunidad masiva. El 90%+ de los notebooks de Kaggle, papers de ML y tutoriales usan Python.</p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-table" aria-hidden="true"></i> Pandas</div>
<p style="font-size:14px;color:var(--text2);">Librería para manipular datos tabulares. DataFrames (tablas) con operaciones potentes: filtrar, agrupar, pivotar, unir datasets. Es tu herramienta #1 para preparar datos.</p>
<div class="code-block"><span class="code-lang">Python</span><code><span class="kw">import</span> pandas <span class="kw">as</span> pd
df = pd.read_csv(<span class="str">'datos.csv'</span>)
df.describe()  <span class="cm"># Estadísticas básicas</span>
df.groupby(<span class="str">'ciudad'</span>)[<span class="str">'ventas'</span>].mean()  <span class="cm"># Promedio por ciudad</span></code></div></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-math-function" aria-hidden="true"></i> NumPy</div>
<p style="font-size:14px;color:var(--text2);">Operaciones numéricas con arrays multidimensionales. La base sobre la que están construidas Pandas, Scikit-learn, PyTorch y TensorFlow.</p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-chart-area" aria-hidden="true"></i> Matplotlib + Seaborn</div>
<p style="font-size:14px;color:var(--text2);">Visualización de datos. Matplotlib es flexible pero verboso; Seaborn es una capa encima que produce gráficos estadísticos elegantes con poco código.</p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-notebook" aria-hidden="true"></i> Jupyter Notebooks</div>
<p style="font-size:14px;color:var(--text2);">Entorno interactivo donde combinas código, resultados, gráficos y texto explicativo en un solo documento. El estándar para exploración de datos y prototipado de modelos.</p></div>

<div class="concept-card"><div class="concept-title"><i class="ti ti-database" aria-hidden="true"></i> SQL</div>
<p style="font-size:14px;color:var(--text2);">Lenguaje para consultar bases de datos relacionales. Imprescindible cuando tus datos están en PostgreSQL, MySQL o BigQuery en vez de en un CSV.</p></div>

<div class="concept-card" style="background:var(--green-bg);"><div class="concept-title" style="color:var(--green-t);"><i class="ti ti-rocket" aria-hidden="true" style="color:var(--green);"></i> ¿Por dónde empezar?</div>
<ol style="font-size:14px;color:var(--green-t);">
<li>Instala Python con <strong>Anaconda</strong> (incluye todo)</li>
<li>Abre <strong>Jupyter Notebook</strong></li>
<li>Carga un dataset de <strong>Kaggle</strong> con Pandas</li>
<li>Explora con <code>.head()</code>, <code>.describe()</code>, <code>.info()</code></li>
<li>Haz tu primer gráfico con Seaborn</li>
</ol></div>`,
        resources: [
          { title: "Google Colab — Notebooks gratis en la nube", url: "https://colab.research.google.com/", type: "Herramienta", icon: "ti-cloud", color: "blue" },
          { title: "Python for Data Science — Kaggle", url: "https://www.kaggle.com/learn/python", type: "Curso", icon: "ti-school", color: "green" },
          { title: "Anaconda — Descarga", url: "https://www.anaconda.com/download", type: "Instalación", icon: "ti-download", color: "accent" }
        ],
        quiz: [
          { q: "¿Cuál es la librería #1 de Python para manipular datos tabulares?", opts: ["NumPy", "TensorFlow", "Pandas", "Flask"], correct: 2, explain: "Pandas es la librería central para cargar, explorar, limpiar y transformar datos tabulares en Python. Su objeto principal, el DataFrame, es esencialmente una tabla con filas y columnas con operaciones potentes integradas." }
        ]
      }
    ]
  }
];
