<?php

namespace App\Entity;

use App\Repository\BookmarkRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;

#[ORM\Entity(repositoryClass: BookmarkRepository::class)]
class Bookmark
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: Types::INTEGER)]
    #[ORM\SequenceGenerator(sequenceName: 'bookmark_id_seq', initialValue: 1)]
    private ?int $id = null;

    #[ORM\Column(length: 120)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\Column(length: 255)]
    private ?string $tag = null;

    #[ORM\Column(name: 'created_at')]
    private ?DateTime $createdAt = null;

    /**
     * Get Id
     * 
     * @return integer
     * 
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Get Title
     * 
     * @return string
     * 
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * Set Title
     * 
     * @return string
     * 
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get Url
     * 
     * @return string
     * 
     */
    public function getUrl(): ?string
    {
        return $this->url;
    }

    /**
     * Set Url
     * 
     * @return string
     * 
     */
    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get Tag
     * 
     * @return string
     * 
     */
    public function getTag(): ?string
    {
        return $this->tag;
    }

    /**
     * Set Tag
     * 
     * @return string
     * 
     */
    public function setTag(string $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    /**
     * Get Created At
     * 
     * @return string
     * 
     */
    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    /**
     * Set Created At
     * 
     * @return string
     * 
     */
    public function setCreatedAt(\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'url' => $this->url,
            'tag' => $this->tag,
            'createdAt' => $this->createdAt->format("Y-m-d H:i:s")
        ];
    }
}
