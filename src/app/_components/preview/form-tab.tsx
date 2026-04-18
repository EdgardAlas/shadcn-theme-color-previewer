'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { healthMetrics } from './data';

export function FormTab() {
  const [notify, setNotify] = useState(true);

  return (
    <div className='grid grid-cols-1 @2xl:grid-cols-2 gap-4'>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>New Team Member</CardTitle>
          <CardDescription className='text-xs'>
            Add a member to your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='flex flex-col gap-1.5'>
                <Label className='text-xs'>First name</Label>
                <Input placeholder='John' className='h-8 text-xs' />
              </div>
              <div className='flex flex-col gap-1.5'>
                <Label className='text-xs'>Last name</Label>
                <Input placeholder='Doe' className='h-8 text-xs' />
              </div>
            </div>
            <div className='flex flex-col gap-1.5'>
              <Label className='text-xs'>Email</Label>
              <Input
                type='email'
                placeholder='name@company.com'
                className='h-8 text-xs'
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <Label className='text-xs'>Role</Label>
              <Select>
                <SelectTrigger className='h-8 text-xs'>
                  <SelectValue placeholder='Select role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='admin' className='text-xs'>
                    Admin
                  </SelectItem>
                  <SelectItem value='editor' className='text-xs'>
                    Editor
                  </SelectItem>
                  <SelectItem value='viewer' className='text-xs'>
                    Viewer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-xs'>Permissions</Label>
              <div className='flex flex-col gap-1.5'>
                {['Read access', 'Write access', 'Delete records'].map(
                  (perm) => (
                    <div key={perm} className='flex items-center gap-2'>
                      <Checkbox
                        id={perm}
                        defaultChecked={perm === 'Read access'}
                      />
                      <label
                        htmlFor={perm}
                        className='text-xs text-foreground cursor-pointer'
                      >
                        {perm}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-0.5'>
                <Label className='text-xs'>Send onboarding email</Label>
                <span className='text-[11px] text-muted-foreground'>
                  Notify on workspace access
                </span>
              </div>
              <Switch checked={notify} onCheckedChange={setNotify} />
            </div>
            <div className='flex gap-2 pt-1'>
              <Button size='sm' className='flex-1 text-xs h-8'>
                Add Member
              </Button>
              <Button variant='outline' size='sm' className='text-xs h-8'>
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Project Health</CardTitle>
          <CardDescription className='text-xs'>
            Q2 metrics at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            {healthMetrics.map(({ label, value }) => (
              <div key={label} className='flex flex-col gap-1.5'>
                <div className='flex justify-between'>
                  <span className='text-xs text-foreground'>{label}</span>
                  <span className='text-xs font-medium text-foreground'>
                    {value}%
                  </span>
                </div>
                <Progress value={value} className='h-1.5' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
