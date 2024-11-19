"use client";

import { useState } from 'react';
import { PencilIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface NotesProps {
  dealRoomId: string;
}

export function Notes({ dealRoomId }: NotesProps) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement note creation logic here
    setNewNote('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={3}
          name="note"
          id="note"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full">
          Add Note
        </Button>
      </form>

      <div className="flow-root">
        <ul className="-mb-8">
          {notes.map((note: any, noteIdx) => (
            <li key={note.id}>
              <div className="relative pb-8">
                {noteIdx !== notes.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center ring-8 ring-white">
                      <ChatBubbleLeftIcon className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <p className="text-sm text-gray-500">{note.content}</p>
                    <div className="mt-2 text-xs text-gray-400">
                      {new Date(note.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}