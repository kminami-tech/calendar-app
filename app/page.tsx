import { CalendarIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Calendar App</p>
            <h1 className="text-3xl font-semibold tracking-normal">予定管理</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              月表示と週表示で確認する予定を、まずは同じUI部品で登録できる形に整えます。
            </p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button size="lg" />}>
              <PlusIcon data-icon="inline-start" />
              新しい予定
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>予定を追加</DialogTitle>
                <DialogDescription>
                  タイトル、日時、色、メモを入力して予定を作成します。
                </DialogDescription>
              </DialogHeader>
              <EventForm />
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="rounded-lg border bg-card p-5 text-card-foreground">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-medium">今日の予定</h2>
                <p className="text-sm text-muted-foreground">
                  shadcn/ui の基本コンポーネントで作る予定フォームの土台です。
                </p>
              </div>
              <Button variant="outline" size="icon" aria-label="月表示を開く">
                <CalendarIcon />
              </Button>
            </div>
            <EventForm />
          </section>

          <aside className="rounded-lg border bg-card p-4 text-card-foreground">
            <h2 className="mb-3 text-lg font-medium">日付</h2>
            <Calendar mode="single" selected={new Date("2026-06-01")} />
          </aside>
        </div>
      </section>
    </main>
  );
}

function EventForm() {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="event-title">タイトル</Label>
        <Input id="event-title" name="title" placeholder="朝会" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="event-start">開始日時</Label>
          <Input
            id="event-start"
            name="startAt"
            type="datetime-local"
            defaultValue="2026-06-01T09:00"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="event-end">終了日時</Label>
          <Input
            id="event-end"
            name="endAt"
            type="datetime-local"
            defaultValue="2026-06-01T10:00"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>色</Label>
          <Select defaultValue="blue">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="色を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="rose">Rose</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="event-all-day">終日</Label>
          <Select defaultValue="false">
            <SelectTrigger id="event-all-day" className="w-full">
              <SelectValue placeholder="時間指定" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">時間指定</SelectItem>
              <SelectItem value="true">終日</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="event-memo">メモ</Label>
        <Textarea id="event-memo" name="memo" placeholder="任意の補足" />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          キャンセル
        </Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
}
