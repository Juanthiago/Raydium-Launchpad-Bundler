import React, { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <form
      className="flex items-center gap-2 px-6 py-4 border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
      onSubmit={handleSend}
    >
      <input
        type="text"
        className="flex-1 rounded-full px-4 py-2 border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Digite uma mensagem..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-colors disabled:opacity-50"
        disabled={disabled || !value.trim()}
      >
        Enviar
      </button>
    </form>
  );
};

export default MessageInput;
