<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class AiKnowledge extends Model
{
    protected $table = 'ai_knowledge';

    protected $fillable = [
        'type',
        'title',
        'question',
        'answer',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeContext(Builder $query): Builder
    {
        return $query->where('type', 'context');
    }

    public function scopeFaq(Builder $query): Builder
    {
        return $query->where('type', 'faq');
    }
}
