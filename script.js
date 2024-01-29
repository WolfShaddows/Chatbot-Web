const OPENAI_API_KEY = 'agruegue su clave aquí'; // Reemplaza con tu propia clave

async function enviarSolicitudOpenAI(prompt) {
    // Función asincrónica para enviar solicitudes a OpenAI
    // Configuración de la solicitud
    const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    // Configuración de la solicitud a OpenAI
    const data = {
        prompt: prompt, // El texto de entrada para la generación de respuesta
        max_tokens: 150 // Número máximo de tokens en la respuesta generada
    };


    try {
        // Realiza la solicitud y obtiene la respuesta
        const response = await axios.post(url, data, { headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        // Maneja errores, muestra un mensaje genérico
        console.error('Error al comunicarse con OpenAI:', error.message);
        return 'Lo siento, ocurrió un error al procesar la solicitud.';
    }
}

function sendMessage() {
    // Función para enviar mensajes del usuario al chat
    // Obtiene el mensaje del usuario
    const userMessage = document.getElementById('userMessage').value;
    if (userMessage.trim() === '') return;

    // Muestra el mensaje del usuario en el contenedor del chat
    const chatMessages = document.getElementById('chat-messages');
    const userDiv = document.createElement('div');
    userDiv.textContent = `Tú: ${userMessage}`;
    chatMessages.appendChild(userDiv);

    // Llama a la función para enviar la solicitud a OpenAI
    enviarSolicitudOpenAI(userMessage)
        .then(respuestaGPT => {
            // Muestra la respuesta del chatbot en el contenedor del chat
            const chatbotDiv = document.createElement('div');
            chatbotDiv.textContent = `Chatbot: ${respuestaGPT}`;
            chatMessages.appendChild(chatbotDiv);
        })
        .catch(error => {
            // Maneja errores, muestra un mensaje en la consola
            console.error('Error al enviar mensaje:', error);
        });

    // Limpia el área de entrada del usuario
    document.getElementById('userMessage').value = '';
}