const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for  each scene and give me result in JSON format with imagePrompt and ContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "Realistic painting of a bustling 1888 Parisian street scene, cobblestones, horse-drawn carriages, gas lamps, people in period clothing, vibrant colors, detailed textures, cinematic lighting",\n    "ContentText": "Our story begins in 1888 Paris, a city brimming with artistic energy and social upheaval.  The air buzzed with the revolutionary ideas of Impressionism and the anxieties of a rapidly changing world."\n  },\n  {\n    "imagePrompt": "Realistic portrait of Vincent van Gogh, intense gaze, concerned expression, wearing a dark coat, slightly disheveled hair, textured brushstrokes in the style of a painting, natural lighting",\n    "ContentText": "Vincent van Gogh, a struggling artist, found himself deeply affected by the poverty and suffering he witnessed around him. His unique perspective would soon revolutionize art."\n  },\n  {\n    "imagePrompt": "Realistic depiction of a dimly lit cafe in Montmartre, Paris, late 1880s, featuring Van Gogh painting at a table, a few other patrons visible in the background, atmospheric lighting, detailed textures, realistic brushstrokes",\n    "ContentText": "He spent countless nights in cafes like this one, painting furiously, pouring his emotions onto the canvas.  His art was a window into his turbulent soul."\n  },\n  {\n    "imagePrompt": "Realistic close-up of Van Gogh\'s \'Starry Night\', showing the swirling brushstrokes, the vibrant colors of the night sky, the village nestled below, highly detailed, painterly texture",\n    "ContentText": "One of his most famous works, \'The Starry Night\', captures the intense emotion and vibrant imagination that defined his artistic vision."\n  },\n  {\n    "imagePrompt": "Realistic image of a wheat field under a bright sun, vast landscape, impasto style brushstrokes in the style of Van Gogh, vibrant yellows and blues, conveying a sense of movement and energy",\n    "ContentText": "His landscapes, often depicting wheat fields, reflect both the beauty of nature and the inner turmoil he experienced."\n  },\n  {\n    "imagePrompt": "Realistic painting of Van Gogh\'s self-portrait, showing his intense gaze, his beard, his emotional state, brushstrokes visible, textures evident, cinematic lighting",\n    "ContentText": "His self-portraits offer a glimpse into the complex and tormented mind of a genius."\n  },\n  {\n    "imagePrompt": "Realistic illustration of a doctor examining Van Gogh, period-appropriate medical setting, concerned expressions on the faces of both men, subdued lighting, detailed textures",\n    "ContentText": "Tragically, Van Gogh\'s mental health deteriorated, and he was often hospitalized. His life was cut short, leaving behind a legacy that continues to inspire awe and wonder."\n  },\n  {\n    "imagePrompt": "Realistic depiction of Van Gogh\'s grave, simple headstone, flowers placed upon it, serene landscape background, soft natural lighting, emphasizing a sense of peace",\n    "ContentText": "Though his life was short and marked by hardship, his art continues to resonate with viewers around the world, a testament to his enduring genius."\n  }\n]\n```\n\n**Note:**  This JSON provides the prompts and text. To create the 30-second video, you\'ll need to:\n\n1. **Use an AI image generator:**  Feed each `imagePrompt` to an AI art generator like Midjourney, Dall-E 2, Stable Diffusion, etc. to create the images.  Experiment with different generators to find the best results for the "Realistic" style.\n\n2. **Video Editing Software:** Use a video editing program (like Adobe Premiere Pro, DaVinci Resolve, iMovie, etc.) to assemble the generated images and corresponding text. You\'ll likely need to adjust the timing of each image (approximately 3-4 seconds per image for a 30-second video) and add transitions for a smooth flow.  Consider adding background music to enhance the emotional impact.\n\n\nThe text provided is concise. You might need to adjust the wording and timing slightly to fit perfectly within a 30-second timeframe. Remember to consider the pacing of your narration or voiceover if you add one.\n',
        },
      ],
    },
  ],
});
