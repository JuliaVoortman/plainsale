import { useState } from 'react';
import { PencilIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

interface Props {
  dealRoomId: string;
}

export function Notes({ dealRoomId }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add note implementation
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-gray-500" />
          Notes
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={3}
            placeholder="Add a note..."
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="flex items-center"
          disabled={!newNote.trim()}
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          Add Note
        </Button>
      </form>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No notes yet. Add your first note to start collaborating.
          </p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="flex space-x-3">
              {note.user.avatar ? (
                <img
                  src={note.user.avatar}
                  alt={note.user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {note.user.name[0]}
                  </span>
                </div>
              )}
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {note.user.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {note.createdAt.toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}