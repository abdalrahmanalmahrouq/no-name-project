<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    public const STATUSES = ['pending', 'in_progress', 'completed', 'archived'];

    public const PRIORITIES = ['low', 'medium', 'high'];

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'estimated_minutes',
        'due_date',
        'priority',
        'status',
    ];

    protected $casts = [
        'due_date'          => 'date',
        'estimated_minutes' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
}
