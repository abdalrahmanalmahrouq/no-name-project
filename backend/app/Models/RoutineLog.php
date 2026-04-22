<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoutineLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'routine_id',
        'user_id',
        'log_date',
        'is_completed',
    ];

    protected $casts = [
        'log_date'     => 'date',
        'is_completed' => 'boolean',
    ];

    public function routine(): BelongsTo
    {
        return $this->belongsTo(Routine::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
