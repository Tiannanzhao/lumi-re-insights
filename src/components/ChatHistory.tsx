import { useState } from "react";
import { History, FolderPlus, Folder, MessageSquare, ChevronRight, ChevronDown, Trash2, Plus, Check, X, ArrowLeft, ChevronsRight } from "lucide-react";
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
  { id: "c6", title: "Conversion funnel analysis", date: "Mar 6", messageCount: 9 },
  { id: "c7", title: "Pricing strategy discussion", date: "Mar 4", messageCount: 4 },
  { id: "c8", title: "Seasonal trend forecast", date: "Mar 2", messageCount: 7 },
];

interface ChatHistoryProps {
  onExpandFullPanel?: () => void;
}

/** Popover trigger button for the sidekick header */
export function ChatHistory({ onExpandFullPanel }: ChatHistoryProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <History className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[320px] p-0">
        <ChatHistoryList
          mode="popover"
          onExpandFullPanel={onExpandFullPanel}
        />
      </PopoverContent>
    </Popover>
  );
}

/** Full-panel view that replaces the entire sidekick */
export function ChatHistoryFullPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header with back button */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Chat History</span>
        </div>
      </div>

      {/* Full list */}
      <div className="flex-1 overflow-y-auto">
        <ChatHistoryList mode="full" />
      </div>
    </div>
  );
}

/** Shared list content used by both popover and full panel */
function ChatHistoryList({
  mode,
  onExpandFullPanel,
}: {
  mode: "popover" | "full";
  onExpandFullPanel?: () => void;
}) {
  const [chats, setChats] = useState<ChatRecord[]>(initialChats);
  const [folders, setFolders] = useState<ChatFolder[]>([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedChats, setSelectedChats] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);

  const displayChats = mode === "popover" ? chats.slice(0, 4) : chats;

  const createFolder = () => {
    if (!newFolderName.trim()) return;
    const folder: ChatFolder = {
      id: `f-${Date.now()}`,
      name: newFolderName.trim(),
      isOpen: true,
    };
    setFolders((prev) => [...prev, folder]);
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

  const unfolderedChats = displayChats.filter((c) => !c.folderId);

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
    <>
      {/* Header (only in popover mode, full panel has its own) */}
      {mode === "popover" && (
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
      )}

      {/* Select toolbar for full panel mode */}
      {mode === "full" && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <span className="text-xs text-muted-foreground">{chats.length} conversations</span>
          <button
            onClick={() => {
              setSelectMode(!selectMode);
              if (selectMode) setSelectedChats(new Set());
            }}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
              selectMode
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Plus className="h-3 w-3" />
            {selectMode ? "Cancel" : "Organize"}
          </button>
        </div>
      )}

      <div className={cn(
        "overflow-y-auto p-2 space-y-1",
        mode === "popover" ? "max-h-[350px]" : "flex-1"
      )}>
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
          const folderChats = displayChats.filter((c) => c.folderId === folder.id);
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

      {/* More conversations button (popover only) */}
      {mode === "popover" && chats.length > 4 && onExpandFullPanel && (
        <div className="px-3 py-2.5 border-t border-border">
          <button
            onClick={onExpandFullPanel}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 border border-primary/20 transition-colors"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
            More conversations ({chats.length - 4} more)
          </button>
        </div>
      )}
    </>
  );
}
