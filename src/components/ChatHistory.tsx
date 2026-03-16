import { useState } from "react";
import { History, FolderPlus, Folder, MessageSquare, ChevronRight, ChevronDown, Trash2, Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatRecord {
  id: string;
  title: string;
  date: string;
  messageCount: number;
  folderId?: string;
}

interface ChatFolder {
  id: string;
  name: string;
  isOpen: boolean;
}

const initialChats: ChatRecord[] = [
  { id: "c1", title: "Q3 Revenue dip analysis", date: "Mar 15", messageCount: 8 },
  { id: "c2", title: "Top products breakdown", date: "Mar 14", messageCount: 5 },
  { id: "c3", title: "APAC region performance", date: "Mar 12", messageCount: 12 },
  { id: "c4", title: "Channel attribution review", date: "Mar 10", messageCount: 3 },
  { id: "c5", title: "Customer retention trends", date: "Mar 8", messageCount: 6 },
];

export function ChatHistory() {
  const [chats, setChats] = useState<ChatRecord[]>(initialChats);
  const [folders, setFolders] = useState<ChatFolder[]>([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedChats, setSelectedChats] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);

  const createFolder = () => {
    if (!newFolderName.trim()) return;
    const folder: ChatFolder = {
      id: `f-${Date.now()}`,
      name: newFolderName.trim(),
      isOpen: true,
    };
    setFolders((prev) => [...prev, folder]);

    // Move selected chats into the new folder
    if (selectedChats.size > 0) {
      setChats((prev) =>
        prev.map((c) => (selectedChats.has(c.id) ? { ...c, folderId: folder.id } : c))
      );
      setSelectedChats(new Set());
      setSelectMode(false);
    }

    setNewFolderName("");
    setCreatingFolder(false);
  };

  const toggleFolder = (folderId: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, isOpen: !f.isOpen } : f))
    );
  };

  const toggleSelect = (chatId: string) => {
    setSelectedChats((prev) => {
      const next = new Set(prev);
      if (next.has(chatId)) next.delete(chatId);
      else next.add(chatId);
      return next;
    });
  };

  const deleteFolder = (folderId: string) => {
    setChats((prev) => prev.map((c) => (c.folderId === folderId ? { ...c, folderId: undefined } : c)));
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
  };

  const unfolderedChats = chats.filter((c) => !c.folderId);

  const ChatItem = ({ chat }: { chat: ChatRecord }) => (
    <button
      onClick={() => selectMode ? toggleSelect(chat.id) : undefined}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors group",
        selectMode ? "cursor-pointer" : "cursor-default",
        selectedChats.has(chat.id)
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-muted/60 border border-transparent"
      )}
    >
      {selectMode && (
        <div
          className={cn(
            "flex items-center justify-center h-4 w-4 rounded border shrink-0 transition-colors",
            selectedChats.has(chat.id)
              ? "bg-primary border-primary text-primary-foreground"
              : "border-border"
          )}
        >
          {selectedChats.has(chat.id) && <Check className="h-2.5 w-2.5" />}
        </div>
      )}
      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">{chat.title}</p>
        <p className="text-[10px] text-muted-foreground">{chat.date} · {chat.messageCount} messages</p>
      </div>
    </button>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <History className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[320px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Chat History</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setSelectMode(!selectMode);
                if (selectMode) setSelectedChats(new Set());
              }}
              className={cn(
                "p-1.5 rounded-md text-xs transition-colors",
                selectMode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              title={selectMode ? "Cancel selection" : "Select to organize"}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
          {/* Select mode toolbar */}
          {selectMode && selectedChats.size > 0 && (
            <div className="flex items-center gap-2 px-2 py-2 mb-1 rounded-lg bg-muted/50 border border-border">
              <span className="text-[11px] text-muted-foreground flex-1">
                {selectedChats.size} selected
              </span>
              <button
                onClick={() => setCreatingFolder(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[11px] font-medium hover:bg-primary/90 transition-colors"
              >
                <FolderPlus className="h-3 w-3" />
                Move to folder
              </button>
            </div>
          )}

          {/* Create folder input */}
          {creatingFolder && (
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-muted/30 border border-border mb-1">
              <Folder className="h-3.5 w-3.5 text-primary shrink-0" />
              <input
                autoFocus
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createFolder()}
                placeholder="Folder name..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button onClick={createFolder} className="p-1 rounded hover:bg-muted text-primary">
                <Check className="h-3 w-3" />
              </button>
              <button
                onClick={() => { setCreatingFolder(false); setNewFolderName(""); }}
                className="p-1 rounded hover:bg-muted text-muted-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Folders */}
          {folders.map((folder) => {
            const folderChats = chats.filter((c) => c.folderId === folder.id);
            return (
              <div key={folder.id} className="mb-1">
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-muted/40 transition-colors group">
                  <button onClick={() => toggleFolder(folder.id)} className="flex items-center gap-1.5 flex-1 min-w-0">
                    {folder.isOpen ? (
                      <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    )}
                    <Folder className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground truncate">{folder.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">{folderChats.length}</span>
                  </button>
                  <button
                    onClick={() => deleteFolder(folder.id)}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                {folder.isOpen && (
                  <div className="ml-4 space-y-0.5 mt-0.5">
                    {folderChats.map((chat) => (
                      <ChatItem key={chat.id} chat={chat} />
                    ))}
                    {folderChats.length === 0 && (
                      <p className="text-[10px] text-muted-foreground px-3 py-1.5">Empty folder</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Unfoldered chats */}
          {unfolderedChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}

          {chats.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">No chat history yet</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
