import { useEffect } from 'react';

const ChatbotWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://zxobzpdydq54i6snwj2xkwaz.agents.do-ai.run/static/chatbot/widget.js';
    script.async = true;
    script.setAttribute('data-agent-id', 'd850ca55-1a81-11f0-bf8f-4e013e2ddde4');
    script.setAttribute('data-chatbot-id', 'EY3DlNWOYk2S-cDG2rwzFHfMfn_FHuXE');
    script.setAttribute('data-name', 'VPANO360 Chatbot');
    script.setAttribute('data-primary-color', '#031B4E');
    script.setAttribute('data-secondary-color', '#E5E8ED');
    script.setAttribute('data-button-background-color', '#0061EB');
    script.setAttribute('data-starting-message', 'มีอะไรให้ช่วยเหลือเกี่ยวกับการถ่ายภาพ 360 องศาไหมค่ะ');
    script.setAttribute('data-logo', '/static/chatbot/icons/default-agent.svg');

    document.body.appendChild(script);

    // ทำความสะอาดเมื่อ Component ถูก unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // เพราะ script เป็น element ที่ไม่ต้องแสดงใน UI
};

export default ChatbotWidget;
