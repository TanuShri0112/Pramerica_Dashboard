import React, { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LinkDialog } from './link-dialog';

const RichTextEditor = forwardRef(({ value, onChange, placeholder = "Add description for your event...", disabled = false, className }, ref) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const executeCommand = useCallback((command, value) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
    editorRef.current?.focus();
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          executeCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            executeCommand('redo');
          } else {
            executeCommand('undo');
          }
          break;
      }
    }
  }, [executeCommand]);

  const handleLinkSave = useCallback((url, text, title, target) => {
    const linkHtml = `<a href="${url}" ${title ? `title=\"${title}\"` : ''} ${target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
    if (document.queryCommandSupported('insertHTML')) {
      executeCommand('insertHTML', linkHtml);
    } else {
      executeCommand('createLink', url);
    }
  }, [executeCommand]);

  const insertLink = useCallback(() => {
    setIsLinkDialogOpen(true);
  }, []);

  const handleFormatBlock = useCallback((format) => {
    executeCommand('formatBlock', format);
  }, [executeCommand]);

  const handleFontName = useCallback((fontName) => {
    executeCommand('fontName', fontName);
  }, [executeCommand]);

  const handleFontSize = useCallback((fontSize) => {
    executeCommand('fontSize', fontSize);
  }, [executeCommand]);

  const handleTextColor = useCallback((color) => {
    executeCommand('foreColor', color);
  }, [executeCommand]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const formatOptions = [
    { label: 'Paragraph', value: 'div' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' },
  ];

  const fontOptions = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Courier New', value: 'Courier New' },
  ];

  const fontSizes = [
    { label: '8pt', value: '1' },
    { label: '10pt', value: '2' },
    { label: '12pt', value: '3' },
    { label: '14pt', value: '4' },
    { label: '18pt', value: '5' },
    { label: '24pt', value: '6' },
    { label: '36pt', value: '7' },
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0'
  ];

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)' },
    { icon: Underline, command: 'underline', title: 'Underline (Ctrl+U)' },
  ];

  const alignmentButtons = [
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
  ];

  const listButtons = [
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
  ];

  return (
    <div ref={ref} className={cn("border rounded-md bg-background", className)}>
      <div className="flex items-center gap-1 p-2 border-b bg-muted/30 flex-wrap">
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Undo (Ctrl+Z)" disabled={disabled} onClick={() => executeCommand('undo')}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Redo (Ctrl+Shift+Z)" disabled={disabled} onClick={() => executeCommand('redo')}>
          <Redo className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Select onValueChange={handleFormatBlock} disabled={disabled}>
          <SelectTrigger className="w-[110px] h-8">
            <SelectValue placeholder="Paragraph" />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleFontName} disabled={disabled}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Arial" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleFontSize} disabled={disabled}>
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue placeholder="12pt" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-6 bg-border mx-1" />

        {toolbarButtons.map(({ icon: Icon, command, title }) => (
          <Button key={command} type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title={title} disabled={disabled} onClick={() => executeCommand(command)}>
            <Icon className="h-4 w-4" />
          </Button>
        ))}

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Text Color" disabled={disabled}>
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="grid grid-cols-7 gap-1">
              {colors.map((color) => (
                <button key={color} className="w-6 h-6 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color }} onClick={() => handleTextColor(color)} title={color} />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-6 bg-border mx-1" />

        {alignmentButtons.map(({ icon: Icon, command, title }) => (
          <Button key={command} type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title={title} disabled={disabled} onClick={() => executeCommand(command)}>
            <Icon className="h-4 w-4" />
          </Button>
        ))}

        <div className="w-px h-6 bg-border mx-1" />

        {listButtons.map(({ icon: Icon, command, title }) => (
          <Button key={command} type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title={title} disabled={disabled} onClick={() => executeCommand(command)}>
            <Icon className="h-4 w-4" />
          </Button>
        ))}

        <div className="w-px h-6 bg-border mx-1" />

        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Link" disabled={disabled} onClick={insertLink}>
          <Link className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable={!disabled}
        className={cn(
          "min-h-[200px] p-3 text-sm ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          !value && !isFocused && "text-muted-foreground",
          "[&_ul]:ml-5 [&_ul]:list-disc",
          "[&_ol]:ml-5 [&_ol]:list-decimal", 
          "[&_li]:my-1",
          "[&_a]:text-primary [&_a]:underline",
          "[&_strong]:font-bold",
          "[&_em]:italic",
          "[&_u]:underline",
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-4",
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3",
          "[&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2",
          "[&_h4]:text-base [&_h4]:font-bold [&_h4]:my-2",
          "[&_h5]:text-sm [&_h5]:font-bold [&_h5]:my-1",
          "[&_h6]:text-xs [&_h6]:font-bold [&_h6]:my-1",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:cursor-text"
        )}
        style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />

      <LinkDialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen} onSave={handleLinkSave} />
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
